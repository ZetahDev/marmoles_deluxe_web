export interface Testimonial {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  texto: string;
  imagen: string;
  instagram: string;
}

export interface CreateTestimonialDto {
  nombre: string;
  texto: string;
  imagen: string;
  instagram: string;
}

export interface UpdateTestimonialDto {
  nombre?: string;
  texto?: string;
  imagen?: string;
  instagram?: string;
}