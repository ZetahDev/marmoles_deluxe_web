import { API_URL } from '../config';
import type { CreateTestimonialDto, Testimonial, UpdateTestimonialDto } from '@/types/testimonial';

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const response = await fetch(`${API_URL}/testimonios`);
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }
  return response.json();
};

export const getTestimonialById = async (id: string): Promise<Testimonial> => {
  const response = await fetch(`${API_URL}/testimonios/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch testimonial');
  }
  return response.json();
};

export const createTestimonial = async (data: CreateTestimonialDto, token: string): Promise<Testimonial> => {
  const response = await fetch(`${API_URL}/testimonios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create testimonial');
  }
  return response.json();
};

export const updateTestimonial = async (id: string, data: UpdateTestimonialDto, token: string): Promise<Testimonial> => {
  const response = await fetch(`${API_URL}/testimonios/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update testimonial');
  }
  return response.json();
};

export const deleteTestimonial = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/testimonios/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete testimonial');
  }
}; 