export interface Material {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  imagen: string;
  descripcion: string;
}

export interface CreateMaterialDto {
  nombre: string;
  imagen: string;
  descripcion: string;
}

export interface UpdateMaterialDto {
  nombre?: string;
  imagen?: string;
  descripcion?: string;
}