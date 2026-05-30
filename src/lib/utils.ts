import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeText(value: string): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function slugify(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
