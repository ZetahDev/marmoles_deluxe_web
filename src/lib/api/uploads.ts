import { API_URL } from '../config';
export type UploadFolder = 'testimonios' | 'materiales' | 'proyectos';

export const uploadFile = async (file: File, folder: UploadFolder, token: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/uploads/${folder}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  const data = await response.json();
  return data.url;
}; 