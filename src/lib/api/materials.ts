import { API_URL } from '../config';
import type { CreateMaterialDto, Material, UpdateMaterialDto } from '@/types/material';

export const getMaterials = async (): Promise<Material[]> => {
  const response = await fetch(`${API_URL}/materiales`);
  if (!response.ok) {
    throw new Error('Failed to fetch materials');
  }
  return response.json();
};

export const getMaterialById = async (id: string): Promise<Material> => {
  const response = await fetch(`${API_URL}/materiales/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch material');
  }
  return response.json();
};

export const createMaterial = async (data: CreateMaterialDto, token: string): Promise<Material> => {
  const response = await fetch(`${API_URL}/materiales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create material');
  }
  return response.json();
};

export const updateMaterial = async (id: string, data: UpdateMaterialDto, token: string): Promise<Material> => {
  const response = await fetch(`${API_URL}/materiales/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update material');
  }
  return response.json();
};

export const deleteMaterial = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/materiales/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete material');
  }
}; 