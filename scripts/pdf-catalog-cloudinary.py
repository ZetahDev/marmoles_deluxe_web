#!/usr/bin/env python3
"""
Extrae materiales desde un PDF de catalogo, genera WEBP optimizados,
arma metadatos (nombre + caracteristicas) y sube a Cloudinary de forma idempotente.

Ejemplo rapido:
python scripts/pdf-catalog-cloudinary.py ^
  --pdf "C:/Users/johan/Downloads/CATALOGO- PIEDRA EXOTICA_.pdf" ^
  --category "PIEDRA+EXOTICA" ^
  --cloudinary-folder "marmoles-deluxe/catalog/piedra-exotica" ^
  --mode both ^
  --upload
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import re
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple
from urllib.parse import unquote, urlparse

import cloudinary
import cloudinary.api
import cloudinary.uploader
import fitz  # PyMuPDF
from PIL import Image


NAME_SKIP_VALUES = {
    "CATALOGO",
    "LINEA LUXURY STONE",
    "LUXURY STONE",
    "INTRODUCCION",
    "TABLA DE",
    "CONTENIDO",
    "NUEVA COLECCION",
    "PIEDRAS IMPORTADAS",
    "MADAGASCAR",
    "BRASIL",
    "ITALIA",
    "ESPANA",
    "INDIA",
    "DESCRIPCION",
    "USOS",
    "FORMATOS DISPONIBLES",
    "ACABADO",
    "COMEDOR",
    "MESONES",
    "BANOS",
    "ESCALERAS",
    "BARRAS",
    "ENCHAPES",
    "PISOS",
    "MESONES COCINA",
    "MURO DE IMPACTO",
}

SECTION_MARKERS = {
    "DESCRIPCION",
    "FORMATOS DISPONIBLES",
    "USOS",
    "ACABADO",
}

STOPWORDS_LOWER = {
    "de",
    "del",
    "la",
    "las",
    "los",
    "y",
    "en",
    "el",
}

MATERIAL_KEYWORDS = {
    "GRANITO",
    "QUARTZITE",
    "AGATA",
    "ONIX",
    "MARMOL",
    "SODALITE",
    "MADERA PETRIFICADA",
}

USE_LABEL_MAP = {
    "MESONES": "Mesones",
    "BANOS": "Baños",
    "ESCALERAS": "Escaleras",
    "COMEDOR": "Comedor",
    "BARRAS": "Barras",
    "ENCHAPES": "Enchapes",
    "PISCINA": "Piscina",
    "PISOS": "Pisos",
    "COCINA": "Cocina",
    "MESONESCOCINA": "Mesones Cocina",
}


@dataclass
class ImageAsset:
    page: int
    index: int
    kind: str  # "render" or "embedded"
    path: Path
    width: int
    height: int

    @property
    def area(self) -> int:
        return self.width * self.height


@dataclass
class Material:
    page: int
    name: str
    slug: str
    description: str
    finish: str
    formats: List[str]
    uses: List[str]
    origin: str
    characteristics: List[str]
    image_asset: Optional[ImageAsset] = None
    design_asset: Optional[ImageAsset] = None
    image_public_id: Optional[str] = None
    design_public_id: Optional[str] = None
    image_url: Optional[str] = None
    design_url: Optional[str] = None


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        if not key or key in os.environ:
            continue

        cleaned = value.strip()
        if (
            len(cleaned) >= 2
            and cleaned[0] == cleaned[-1]
            and cleaned[0] in {'"', "'"}
        ):
            cleaned = cleaned[1:-1]
        os.environ[key] = cleaned


def normalize_for_match(value: str) -> str:
    folded = (
        unicodedata.normalize("NFKD", value)
        .encode("ascii", "ignore")
        .decode("ascii")
        .upper()
    )
    folded = re.sub(r"[^A-Z0-9 ]+", " ", folded)
    folded = re.sub(r"\s+", " ", folded).strip()
    return folded


def slugify(value: str) -> str:
    folded = (
        unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    )
    folded = folded.lower()
    folded = re.sub(r"[^a-z0-9]+", "_", folded)
    folded = re.sub(r"_+", "_", folded).strip("_")
    return folded or "material"


def normalize_spaces(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\u00a0", " ")).strip()


def is_spaced_letters_line(line: str) -> bool:
    return bool(re.fullmatch(r"(?:[A-ZÁÉÍÓÚÜÑ]\s+){2,}[A-ZÁÉÍÓÚÜÑ]", line.strip()))


def collapse_spaced_letters(line: str) -> str:
    if is_spaced_letters_line(line):
        return line.replace(" ", "")
    return line


def is_uppercase_candidate(line: str) -> bool:
    letters = [c for c in line if c.isalpha()]
    if len(letters) < 4:
        return False
    uppercase_ratio = sum(1 for c in letters if c.isupper()) / len(letters)
    return uppercase_ratio >= 0.7


def prettify_title(raw_name: str) -> str:
    words = normalize_spaces(raw_name).split(" ")
    formatted: List[str] = []
    for idx, word in enumerate(words):
        if not word:
            continue

        pure = re.sub(r"[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]", "", word)
        if idx > 0 and pure.lower() in STOPWORDS_LOWER:
            formatted.append(word.lower())
            continue

        if len(pure) <= 2 and pure.upper() == pure and pure:
            formatted.append(word.upper())
            continue

        formatted.append(word.lower().capitalize())

    return " ".join(formatted).strip()


def should_skip_name(line: str) -> bool:
    if not line:
        return True

    normalized = normalize_for_match(line)
    if not normalized:
        return True

    if normalized in NAME_SKIP_VALUES:
        return True

    if "IMPORTADA DE" in normalized or "IMPORTADO DE" in normalized:
        return True

    if normalized.isdigit():
        return True

    if ":" in line:
        return True

    if len(normalized) < 4 or len(normalized) > 80:
        return True

    return False


def parse_page_lines(page_text: str) -> List[str]:
    lines = []
    for raw in page_text.splitlines():
        line = normalize_spaces(raw)
        if not line:
            continue
        lines.append(line)
    return lines


def extract_name_from_sentence(line: str) -> Optional[str]:
    sentence_pattern = re.compile(
        r"\b(?:El|La)\s+((?:Granito|Quartzite|[ÁA]gata|[ÓO]nix|M[áa]rmol|Sodalite|Madera\s+Petri(?:f|ﬁ)cada)\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+?)(?:,|\.)",
        flags=re.IGNORECASE,
    )
    match = sentence_pattern.search(line)
    if not match:
        return None
    return prettify_title(normalize_spaces(match.group(1)))


def has_material_keyword(normalized_line: str) -> bool:
    return any(keyword in normalized_line for keyword in MATERIAL_KEYWORDS)


def normalize_spaced_use_label(line: str) -> str:
    compact = normalize_spaces(line)
    if is_spaced_letters_line(compact):
        return compact.replace(" ", "")
    return compact


def detect_name_from_lines(lines: List[str]) -> Optional[str]:
    scored_candidates: List[Tuple[int, str]] = []
    for index, line in enumerate(lines[:42]):
        sentence_name = extract_name_from_sentence(line)
        if sentence_name:
            scored_candidates.append((18 - min(index, 10), sentence_name))
            continue

        if should_skip_name(line):
            continue

        normalized = normalize_for_match(line)
        if not normalized:
            continue

        if "IMPORTADA DE" in normalized or "IMPORTADO DE" in normalized:
            continue

        if not has_material_keyword(normalized):
            continue

        if not is_uppercase_candidate(line):
            continue

        score = 0
        if has_material_keyword(normalized):
            score += 10
        if is_uppercase_candidate(line):
            score += 6

        words = line.split()
        if 1 <= len(words) <= 6:
            score += 2

        if index < 8:
            score += 1

        if any(token in normalized for token in ("MESONES", "BARRAS", "ESCALERAS", "COMEDOR", "MURO", "ENCHAPES")):
            score -= 8

        if "LUXURY STONE" in normalized:
            score -= 12

        if score > 0:
            scored_candidates.append((score, prettify_title(line)))

    if not scored_candidates:
        return None

    scored_candidates.sort(key=lambda item: item[0], reverse=True)
    best_name = scored_candidates[0][1]
    normalized_best = normalize_for_match(best_name)
    if normalized_best in NAME_SKIP_VALUES:
        return None
    return best_name


def parse_description(lines: List[str]) -> str:
    text = " ".join(lines)
    if not text:
        return ""
    text = normalize_spaces(text)
    return text


def split_sections(lines: List[str]) -> Dict[str, List[str]]:
    sections: Dict[str, List[str]] = {
        "header": [],
        "description": [],
        "formats": [],
        "uses": [],
    }
    current = "header"
    for line in lines:
        marker = normalize_for_match(line)
        if marker.startswith("DESCRIPCION"):
            current = "description"
            continue
        if marker.startswith("FORMATOS DISPONIBLES"):
            current = "formats"
            continue
        if marker.startswith("USOS"):
            current = "uses"
            continue
        if marker.startswith("ACABADO"):
            current = "header"
            continue
        if marker in SECTION_MARKERS:
            continue
        sections[current].append(line)
    return sections


def parse_finish(lines: List[str]) -> str:
    pattern = re.compile(r"acabado\s*:\s*(.+)$", flags=re.IGNORECASE)
    for line in lines:
        match = pattern.search(line)
        if match:
            return normalize_spaces(match.group(1))
    return ""


def parse_origin(description: str) -> str:
    if not description:
        return ""
    match = re.search(
        r"importad[oa]s?\s+de\s+([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)",
        description,
        flags=re.IGNORECASE,
    )
    if not match:
        return ""
    return prettify_title(match.group(1))


def parse_uses(uses_lines: List[str]) -> List[str]:
    tokens: List[str] = []
    for line in uses_lines:
        candidate = normalize_spaced_use_label(line)
        if not candidate:
            continue
        normalized = normalize_for_match(candidate).replace(" ", "")
        if not normalized or normalized.startswith("NOTA") or normalized.isdigit():
            continue
        tokens.append(normalized)

    merged: List[str] = []
    idx = 0
    while idx < len(tokens):
        token = tokens[idx]
        next_token = tokens[idx + 1] if idx + 1 < len(tokens) else ""

        if token == "MURODE" and next_token == "IMPACTO":
            merged.append("Muro de Impacto")
            idx += 2
            continue

        if token == "MESONES" and next_token == "COCINA":
            merged.append("Mesones Cocina")
            idx += 2
            continue

        label = USE_LABEL_MAP.get(token)
        if label:
            merged.append(label)
        idx += 1

    uses: List[str] = []
    for item in merged:
        if item not in uses:
            uses.append(item)
    return uses


def parse_formats(format_lines: List[str]) -> List[str]:
    cleaned: List[str] = []
    for line in format_lines:
        candidate = normalize_spaces(line)
        normalized = normalize_for_match(candidate)
        if (
            not candidate
            or normalized.startswith("NOTA")
            or normalized == "FORMATOS DISPONIBLES"
            or normalized.isdigit()
        ):
            continue
        cleaned.append(candidate)
    return cleaned


def build_characteristics(
    origin: str,
    finish: str,
    formats: List[str],
    uses: List[str],
    description: str,
) -> List[str]:
    characteristics: List[str] = []
    if origin:
        characteristics.append(f"Origen: {origin}")
    if finish:
        characteristics.append(f"Acabado: {finish}")
    if formats:
        characteristics.append(f"Formato: {formats[0]}")
    if uses:
        characteristics.append(f"Usos: {', '.join(uses[:6])}")

    if description and not characteristics:
        sentence = description.split(".")[0].strip()
        if sentence:
            characteristics.append(sentence[:180])

    return characteristics


def ensure_unique_slugs(materials: List[Material]) -> None:
    seen: Dict[str, int] = {}
    for material in materials:
        base = material.slug
        if base not in seen:
            seen[base] = 1
            continue
        seen[base] += 1
        material.slug = f"{base}_{seen[base]}"


def detect_materials(doc: fitz.Document) -> List[Material]:
    materials: List[Material] = []
    for page_idx in range(len(doc)):
        page = doc.load_page(page_idx)
        lines = parse_page_lines(page.get_text("text"))
        if not lines:
            continue

        name = detect_name_from_lines(lines)
        if not name:
            continue

        sections = split_sections(lines)
        description = parse_description(sections["description"])
        if not description:
            fallback_description_lines = [
                line for line in lines if len(line) > 45 and ":" not in line
            ][:4]
            description = parse_description(fallback_description_lines)
        finish = parse_finish(lines)
        formats = parse_formats(sections["formats"])
        uses = parse_uses(sections["uses"])
        origin = parse_origin(description) or parse_origin(" ".join(lines))
        characteristics = build_characteristics(origin, finish, formats, uses, description)

        materials.append(
            Material(
                page=page_idx + 1,
                name=name,
                slug=slugify(name),
                description=description,
                finish=finish,
                formats=formats,
                uses=uses,
                origin=origin,
                characteristics=characteristics,
            )
        )

    ensure_unique_slugs(materials)
    return materials


def ensure_output_dirs(base_dir: Path) -> Tuple[Path, Path]:
    rendered_dir = base_dir / "rendered"
    embedded_dir = base_dir / "embedded"
    rendered_dir.mkdir(parents=True, exist_ok=True)
    embedded_dir.mkdir(parents=True, exist_ok=True)
    return rendered_dir, embedded_dir


def render_pdf_pages(
    doc: fitz.Document,
    output_dir: Path,
    quality: int,
    zoom: float,
    start_page: int,
    end_page: int,
) -> List[ImageAsset]:
    assets: List[ImageAsset] = []
    for page_no in range(start_page, end_page + 1):
        page = doc.load_page(page_no - 1)
        pixmap = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        image = Image.open(io.BytesIO(pixmap.tobytes("png"))).convert("RGB")
        dest = output_dir / f"page_{page_no:03d}.webp"
        image.save(dest, "WEBP", quality=quality, method=6)
        assets.append(
            ImageAsset(
                page=page_no,
                index=1,
                kind="render",
                path=dest,
                width=image.width,
                height=image.height,
            )
        )
    return assets


def extract_embedded_images(
    doc: fitz.Document,
    output_dir: Path,
    quality: int,
    start_page: int,
    end_page: int,
    min_width: int,
    min_height: int,
) -> List[ImageAsset]:
    assets: List[ImageAsset] = []
    seen_hashes: set[str] = set()
    for page_no in range(start_page, end_page + 1):
        page = doc.load_page(page_no - 1)
        images = page.get_images(full=True)
        index = 0
        for image_info in images:
            xref = image_info[0]
            extracted = doc.extract_image(xref)
            image_bytes = extracted.get("image")
            if not image_bytes:
                continue

            digest = hashlib.sha1(image_bytes).hexdigest()
            if digest in seen_hashes:
                continue

            try:
                pil_image = Image.open(io.BytesIO(image_bytes))
                pil_image.load()
            except Exception:
                continue

            if pil_image.width < min_width or pil_image.height < min_height:
                continue

            seen_hashes.add(digest)
            index += 1
            converted = pil_image.convert("RGB")
            dest = output_dir / f"page_{page_no:03d}_img_{index:02d}.webp"
            converted.save(dest, "WEBP", quality=quality, method=6)
            assets.append(
                ImageAsset(
                    page=page_no,
                    index=index,
                    kind="embedded",
                    path=dest,
                    width=converted.width,
                    height=converted.height,
                )
            )
    return assets


def index_assets_by_page(assets: Iterable[ImageAsset]) -> Dict[int, List[ImageAsset]]:
    by_page: Dict[int, List[ImageAsset]] = {}
    for asset in assets:
        by_page.setdefault(asset.page, []).append(asset)
    for page_assets in by_page.values():
        page_assets.sort(key=lambda item: item.area, reverse=True)
    return by_page


def pick_asset_for_page(
    page_assets: Dict[int, List[ImageAsset]],
    page: int,
    fallback_assets: Dict[int, List[ImageAsset]],
) -> Optional[ImageAsset]:
    direct = page_assets.get(page)
    if direct:
        return direct[0]
    fallback = fallback_assets.get(page)
    if fallback:
        return fallback[0]
    return None


def assign_material_assets(
    materials: List[Material],
    embedded_assets: List[ImageAsset],
    rendered_assets: List[ImageAsset],
) -> None:
    embedded_by_page = index_assets_by_page(embedded_assets)
    rendered_by_page = index_assets_by_page(rendered_assets)
    material_pages = {material.page for material in materials}

    for material in materials:
        image_asset = pick_asset_for_page(embedded_by_page, material.page, rendered_by_page)
        design_asset: Optional[ImageAsset] = None

        next_page = material.page + 1
        if next_page not in material_pages:
            design_asset = pick_asset_for_page(
                embedded_by_page, next_page, rendered_by_page
            )

        if not design_asset:
            same_page_embedded = embedded_by_page.get(material.page, [])
            if len(same_page_embedded) > 1:
                design_asset = same_page_embedded[1]

        if not design_asset:
            design_asset = image_asset

        material.image_asset = image_asset
        material.design_asset = design_asset


def load_overrides(path: Optional[Path]) -> Dict[str, Any]:
    if not path:
        return {}
    if not path.exists():
        raise FileNotFoundError(f"No existe archivo de overrides: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def apply_overrides(materials: List[Material], overrides: Dict[str, Any]) -> List[Material]:
    if not overrides:
        return materials

    by_page = overrides.get("by_page", {})
    overridden: List[Material] = []
    for material in materials:
        patch = by_page.get(str(material.page), {})
        if patch.get("skip") is True:
            continue

        if "name" in patch and patch["name"]:
            material.name = str(patch["name"]).strip()
        if "slug" in patch and patch["slug"]:
            material.slug = slugify(str(patch["slug"]))
        else:
            material.slug = slugify(material.name)

        if "characteristics" in patch and isinstance(patch["characteristics"], list):
            material.characteristics = [str(item).strip() for item in patch["characteristics"] if str(item).strip()]
        if "origin" in patch and patch["origin"]:
            material.origin = str(patch["origin"]).strip()
        if "finish" in patch and patch["finish"]:
            material.finish = str(patch["finish"]).strip()
        if "formats" in patch and isinstance(patch["formats"], list):
            material.formats = [str(item).strip() for item in patch["formats"] if str(item).strip()]
        if "uses" in patch and isinstance(patch["uses"], list):
            material.uses = [str(item).strip() for item in patch["uses"] if str(item).strip()]
        if "description" in patch and patch["description"]:
            material.description = str(patch["description"]).strip()

        if not material.characteristics:
            material.characteristics = build_characteristics(
                material.origin,
                material.finish,
                material.formats,
                material.uses,
                material.description,
            )

        overridden.append(material)

    ensure_unique_slugs(overridden)
    return overridden


def parse_cloudinary_credentials(cloudinary_url: str) -> Tuple[str, str, str]:
    parsed = urlparse(cloudinary_url)
    if not parsed.hostname:
        raise ValueError("CLOUDINARY_URL invalida: no contiene cloud_name.")
    api_key = unquote(parsed.username or "")
    api_secret = unquote(parsed.password or "")
    if not api_key or not api_secret:
        raise ValueError("CLOUDINARY_URL invalida: faltan api_key o api_secret.")
    return parsed.hostname, api_key, api_secret


def to_cloudinary_delivery_url(cloud_name: str, public_id: str) -> str:
    return f"https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}"


def list_existing_resources(prefix: str) -> Dict[str, str]:
    existing: Dict[str, str] = {}
    next_cursor = None
    while True:
        response = cloudinary.api.resources(
            type="upload",
            prefix=prefix,
            max_results=500,
            next_cursor=next_cursor,
        )
        for resource in response.get("resources", []):
            public_id = resource.get("public_id")
            if public_id:
                existing[public_id] = resource.get("secure_url", "")
        next_cursor = response.get("next_cursor")
        if not next_cursor:
            break
    return existing


def upload_single_asset(
    asset_path: Path,
    public_id: str,
    dry_run: bool,
    overwrite: bool,
    existing_resources: Dict[str, str],
    cloud_name: str,
) -> str:
    if dry_run:
        return to_cloudinary_delivery_url(cloud_name, public_id)

    if not overwrite and public_id in existing_resources:
        return existing_resources[public_id] or to_cloudinary_delivery_url(
            cloud_name, public_id
        )

    result = cloudinary.uploader.upload(
        str(asset_path),
        public_id=public_id,
        overwrite=overwrite,
        unique_filename=False,
        resource_type="image",
    )
    return result["secure_url"]


def upload_material_assets(
    materials: List[Material],
    category: str,
    cloudinary_folder: str,
    dry_run: bool,
    overwrite: bool,
    concurrency: int,
    cloud_name: str,
) -> None:
    tasks: List[Tuple[Material, str, Path, str]] = []
    category_slug = slugify(category).replace("_", "-")
    folder_prefix = cloudinary_folder.strip("/").replace("\\", "/")
    if not folder_prefix:
        folder_prefix = f"marmoles-deluxe/catalog/{category_slug}"

    for material in materials:
        if not material.image_asset:
            continue

        image_public_id = f"{folder_prefix}/{material.slug}"
        design_public_id = f"{folder_prefix}/{material.slug}_designs"

        material.image_public_id = image_public_id
        material.design_public_id = design_public_id

        tasks.append((material, "image", material.image_asset.path, image_public_id))

        design_asset = material.design_asset or material.image_asset
        tasks.append((material, "design", design_asset.path, design_public_id))

    existing_resources: Dict[str, str] = {}
    if not dry_run:
        existing_resources = list_existing_resources(f"{folder_prefix}/")

    def worker(item: Tuple[Material, str, Path, str]) -> Tuple[Material, str, str]:
        material, field_name, file_path, public_id = item
        url = upload_single_asset(
            file_path,
            public_id,
            dry_run=dry_run,
            overwrite=overwrite,
            existing_resources=existing_resources,
            cloud_name=cloud_name,
        )
        return material, field_name, url

    max_workers = max(1, min(concurrency, len(tasks) or 1))
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(worker, item) for item in tasks]
        for future in as_completed(futures):
            material, field_name, url = future.result()
            if field_name == "image":
                material.image_url = url
            else:
                material.design_url = url


def material_to_report_dict(material: Material) -> Dict[str, Any]:
    return {
        "page": material.page,
        "name": material.name,
        "slug": material.slug,
        "origin": material.origin,
        "finish": material.finish,
        "formats": material.formats,
        "uses": material.uses,
        "characteristics": material.characteristics,
        "description": material.description,
        "image": {
            "localPath": str(material.image_asset.path) if material.image_asset else "",
            "publicId": material.image_public_id or "",
            "url": material.image_url or "",
        },
        "design": {
            "localPath": str(material.design_asset.path) if material.design_asset else "",
            "publicId": material.design_public_id or "",
            "url": material.design_url or "",
        },
    }


def build_category_stones(materials: List[Material]) -> List[Dict[str, str]]:
    stones: List[Dict[str, str]] = []
    for material in materials:
        image_url = material.image_url or ""
        design_url = material.design_url or image_url
        if not image_url:
            continue
        stones.append(
            {
                "name": material.name,
                "image": image_url,
                "design": design_url,
            }
        )
    stones.sort(key=lambda item: item["name"])
    return stones


def update_cloudinary_index(
    index_file: Path,
    category_key: str,
    category_label: str,
    stones: List[Dict[str, str]],
) -> None:
    if not index_file.exists():
        raise FileNotFoundError(f"No existe cloudinary index: {index_file}")

    payload = json.loads(index_file.read_text(encoding="utf-8"))
    payload.setdefault("categories", {})
    payload.setdefault("designGallery", [])

    payload["categories"][category_key] = stones
    payload["designGallery"] = [
        item
        for item in payload["designGallery"]
        if normalize_for_match(str(item.get("category", "")))
        != normalize_for_match(category_label)
    ]

    for stone in stones:
        payload["designGallery"].append(
            {
                "name": stone["name"],
                "category": category_label,
                "url": stone["design"],
            }
        )

    payload["designGallery"] = sorted(
        payload["designGallery"], key=lambda item: item.get("name", "")
    )
    payload["generatedAt"] = datetime.now(timezone.utc).isoformat()
    index_file.write_text(
        f"{json.dumps(payload, ensure_ascii=False, indent=2)}\n", encoding="utf-8"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Pipeline PDF -> WEBP -> metadata -> Cloudinary para catalogo."
    )
    parser.add_argument("--pdf", required=True, help="Ruta absoluta o relativa del PDF.")
    parser.add_argument(
        "--output-dir",
        default="tmp/pdf-catalog-export",
        help="Directorio de salida para imagenes y metadata.",
    )
    parser.add_argument(
        "--category",
        default="PIEDRA+EXOTICA",
        help="Clave de categoria para export/index (ej: PIEDRA+EXOTICA).",
    )
    parser.add_argument(
        "--category-label",
        default="Piedra Exotica",
        help="Etiqueta amigable para designGallery.",
    )
    parser.add_argument(
        "--cloudinary-folder",
        default="marmoles-deluxe/catalog/piedra-exotica",
        help="Prefijo de public_id en Cloudinary.",
    )
    parser.add_argument(
        "--mode",
        choices=["render", "extract", "both"],
        default="both",
        help="Modo de extraccion de imagenes.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=85,
        help="Calidad WEBP (1-100).",
    )
    parser.add_argument(
        "--zoom",
        type=float,
        default=2.0,
        help="Zoom para render de pagina completa.",
    )
    parser.add_argument("--min-width", type=int, default=500)
    parser.add_argument("--min-height", type=int, default=500)
    parser.add_argument("--start-page", type=int, default=1)
    parser.add_argument("--end-page", type=int, default=0, help="0 = ultima pagina")
    parser.add_argument(
        "--overrides-file",
        default="",
        help="JSON opcional para ajustar nombres/caracteristicas por pagina.",
    )
    parser.add_argument(
        "--upload",
        action="store_true",
        help="Sube a Cloudinary. Si no se usa, solo genera assets/metadata local.",
    )
    parser.add_argument("--dry-run", action="store_true", help="No sube archivos.")
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Sobrescribe recursos existentes en Cloudinary.",
    )
    parser.add_argument("--concurrency", type=int, default=4)
    parser.add_argument(
        "--report-file",
        default="materials-report.json",
        help="Nombre del reporte JSON dentro de output-dir.",
    )
    parser.add_argument(
        "--update-index",
        action="store_true",
        help="Actualiza src/data/cloudinary-index.json con la nueva categoria.",
    )
    parser.add_argument(
        "--index-file",
        default="src/data/cloudinary-index.json",
        help="Ruta del cloudinary-index.json a actualizar.",
    )
    parser.add_argument(
        "--dotenv",
        default=".env",
        help="Ruta del archivo .env para leer CLOUDINARY_URL.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    quality = max(1, min(100, int(args.quality)))
    concurrency = max(1, int(args.concurrency))

    pdf_path = Path(args.pdf).expanduser().resolve()
    if not pdf_path.exists():
        raise FileNotFoundError(f"No existe el PDF: {pdf_path}")

    output_dir = Path(args.output_dir).expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    rendered_dir, embedded_dir = ensure_output_dirs(output_dir)
    report_path = output_dir / args.report_file

    load_dotenv(Path(args.dotenv))

    cloudinary_url = os.environ.get("CLOUDINARY_URL", "").strip()
    cloud_name = ""
    if args.upload or args.update_index:
        if not cloudinary_url:
            raise RuntimeError("Falta CLOUDINARY_URL en entorno o .env")
        cloud_name, api_key, api_secret = parse_cloudinary_credentials(cloudinary_url)
        cloudinary.config(
            cloud_name=cloud_name,
            api_key=api_key,
            api_secret=api_secret,
            secure=True,
        )

    with fitz.open(str(pdf_path)) as doc:
        end_page = args.end_page if args.end_page > 0 else len(doc)
        start_page = max(1, int(args.start_page))
        end_page = min(end_page, len(doc))
        if start_page > end_page:
            raise ValueError("Rango invalido de paginas")

        materials = detect_materials(doc)
        overrides = load_overrides(Path(args.overrides_file)) if args.overrides_file else {}
        materials = apply_overrides(materials, overrides)

        rendered_assets: List[ImageAsset] = []
        embedded_assets: List[ImageAsset] = []

        if args.mode in {"render", "both"}:
            rendered_assets = render_pdf_pages(
                doc=doc,
                output_dir=rendered_dir,
                quality=quality,
                zoom=float(args.zoom),
                start_page=start_page,
                end_page=end_page,
            )

        if args.mode in {"extract", "both"}:
            embedded_assets = extract_embedded_images(
                doc=doc,
                output_dir=embedded_dir,
                quality=quality,
                start_page=start_page,
                end_page=end_page,
                min_width=int(args.min_width),
                min_height=int(args.min_height),
            )

    assign_material_assets(materials, embedded_assets, rendered_assets)

    upload_enabled = args.upload or args.dry_run
    if upload_enabled:
        if not cloudinary_url:
            raise RuntimeError("Se requiere CLOUDINARY_URL para upload o dry-run de upload")
        upload_material_assets(
            materials=materials,
            category=args.category,
            cloudinary_folder=args.cloudinary_folder,
            dry_run=bool(args.dry_run),
            overwrite=bool(args.overwrite),
            concurrency=concurrency,
            cloud_name=cloud_name,
        )

    report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "pdfPath": str(pdf_path),
        "outputDir": str(output_dir),
        "category": args.category,
        "categoryLabel": args.category_label,
        "mode": args.mode,
        "quality": quality,
        "zoom": float(args.zoom),
        "renderedAssets": len(rendered_assets),
        "embeddedAssets": len(embedded_assets),
        "materialsDetected": len(materials),
        "materialsWithImage": sum(1 for item in materials if item.image_asset),
        "materialsWithDesign": sum(1 for item in materials if item.design_asset),
        "materials": [material_to_report_dict(item) for item in materials],
        "categoryStones": build_category_stones(materials),
    }

    report_path.write_text(
        f"{json.dumps(report, ensure_ascii=False, indent=2)}\n", encoding="utf-8"
    )

    if args.update_index:
        stones = build_category_stones(materials)
        if not stones:
            raise RuntimeError(
                "No hay URLs Cloudinary en materiales. Usa --upload (o --dry-run para validar)."
            )
        update_cloudinary_index(
            index_file=Path(args.index_file).resolve(),
            category_key=args.category,
            category_label=args.category_label,
            stones=stones,
        )

    print(f"PDF procesado: {pdf_path}")
    print(f"Materiales detectados: {len(materials)}")
    print(f"Assets render: {len(rendered_assets)} | Assets embedded: {len(embedded_assets)}")
    print(f"Reporte: {report_path}")
    if upload_enabled:
        print(
            f"Cloudinary: {'dry-run' if args.dry_run else 'upload real'} | folder={args.cloudinary_folder}"
        )


if __name__ == "__main__":
    main()
