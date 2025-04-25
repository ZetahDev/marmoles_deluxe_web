"use client";
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function TestimonialManager() {
  const [testimonial, setTestimonial] = useState({
    name: '',
    text: '',
    instagramUsername: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [s3Url, setS3Url] = useState(''); // URL firmada para S3
  const fileInputRef = useRef(null);
  const jsonRef = useRef(null);

  // Cargar datos de localStorage en un useEffect para asegurar que estamos en el cliente
  useEffect(() => {
    // Verificar que estamos en el navegador
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('marmolesTestimonials');
      if (saved) {
        try {
          setTestimonials(JSON.parse(saved));
        } catch (e) {
          console.error('Error parsing saved testimonials:', e);
        }
      }
    }
  }, []);

  // Guardar en localStorage (modificado para verificar entorno)
  const saveToLocalStorage = (data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('marmolesTestimonials', JSON.stringify(data));
    }
  };

  // Manejar cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial(prev => ({ ...prev, [name]: value }));
  };

  // Manejar la selección de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('La imagen es demasiado grande. Máximo 5MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecciona una imagen válida.');
      return;
    }

    setTestimonial(prev => ({ ...prev, image: file }));
    
    // Generar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Actualizar URL de S3
  const handleS3UrlChange = (e) => {
    setS3Url(e.target.value);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!testimonial.name || !testimonial.text || !testimonial.instagramUsername || !testimonial.image) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    if (!s3Url) {
      toast.error('Necesitas proporcionar una URL firmada para S3');
      return;
    }

    try {
      setIsUploading(true);
      
      // 1. Subir la imagen a S3 usando la URL prefirmada
      const uploadResult = await fetch(s3Url, {
        method: 'PUT',
        body: testimonial.image,
        headers: {
          'Content-Type': testimonial.image.type,
        }
      });

      if (!uploadResult.ok) {
        throw new Error('Error al subir la imagen');
      }

      // 2. Obtener la URL pública (es la misma URL sin la parte de firma)
      const publicUrl = s3Url.split('?')[0];
      
      // 3. Crear objeto de testimonio completo
      const newTestimonial = {
        id: Date.now().toString(),
        name: testimonial.name,
        text: testimonial.text,
        image: publicUrl,
        profileUrl: `https://instagram.com/${testimonial.instagramUsername.replace('@', '')}`
      };

      // 4. Añadir al array de testimonios
      const updatedTestimonials = [...testimonials, newTestimonial];
      setTestimonials(updatedTestimonials);
      
      // 5. Guardar en localStorage (usando la función segura)
      saveToLocalStorage(updatedTestimonials);

      // 6. Limpiar el formulario
      setTestimonial({
        name: '',
        text: '',
        instagramUsername: '',
        image: null
      });
      setPreviewUrl('');
      setS3Url('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.success('Testimonio guardado con éxito');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar el testimonio');
    } finally {
      setIsUploading(false);
    }
  };

  // Copiar JSON al portapapeles
  const copyJsonToClipboard = () => {
    if (jsonRef.current) {
      const jsonText = jsonRef.current.textContent;
      navigator.clipboard.writeText(jsonText)
        .then(() => toast.success('JSON copiado al portapapeles'))
        .catch(() => toast.error('Error al copiar'));
    }
  };

  // Descargar JSON como archivo
  const downloadJson = () => {
    const dataStr = JSON.stringify(testimonials, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportName = `testimonios_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Administrar Testimonios</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="client-name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Cliente
          </label>
          <input
            id="client-name"
            type="text"
            name="name"
            value={testimonial.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej. Juan Pérez"
          />
        </div>
        
        <div>
          <label htmlFor="client-testimonial" className="block text-sm font-medium text-gray-700 mb-1">
            Testimonio
          </label>
          <textarea
            id="client-testimonial"
            name="text"
            value={testimonial.text}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Escribe el testimonio del cliente..."
          />
        </div>
        
        <div>
          <label htmlFor="instagram-username" className="block text-sm font-medium text-gray-700 mb-1">
            Usuario de Instagram
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              @
            </span>
            <input
              id="instagram-username"
              type="text"
              name="instagramUsername"
              value={testimonial.instagramUsername}
              onChange={handleChange}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="usuario_instagram"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="client-image" className="block text-sm font-medium text-gray-700 mb-1">
            Imagen del Cliente
          </label>
          <input
            id="client-image"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="w-full"
          />
          {previewUrl && (
            <div className="mt-2">
              <img 
                src={previewUrl} 
                alt="Vista previa" 
                className="h-40 w-40 object-cover rounded-full border border-gray-300" 
              />
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="s3-url" className="block text-sm font-medium text-gray-700 mb-1">
            URL de S3 Prefirmada (generada manualmente)
          </label>
          <input
            id="s3-url"
            type="text"
            value={s3Url}
            onChange={handleS3UrlChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Pega aquí la URL firmada de S3"
          />
          <p className="mt-1 text-xs text-gray-500">
            Genera manualmente una URL prefirmada en AWS S3 y pégala aquí para subir la imagen.
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isUploading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isUploading ? 'Guardando...' : 'Guardar Testimonio'}
        </button>
      </form>
      
      {/* Lista de testimonios */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Testimonios Guardados ({testimonials.length})</h3>
          <div className="space-x-2">
            <button
              onClick={copyJsonToClipboard}
              className="px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              Copiar JSON
            </button>
            <button
              onClick={downloadJson}
              className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Descargar JSON
            </button>
          </div>
        </div>
        
        {testimonials.length > 0 ? (
          <>
            <div className="overflow-y-auto max-h-80 mb-4">
              <ul className="space-y-4">
                {testimonials.map((item) => (
                  <li key={item.id} className="p-3 border rounded-lg flex items-start">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-16 w-16 rounded-full object-cover mr-3" 
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600 my-1 line-clamp-2">{item.text}</p>
                      <a 
                        href={item.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Instagram
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-100 p-3 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">JSON generado:</span>
              </div>
              <pre 
                ref={jsonRef}
                className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto"
              >
                {JSON.stringify(testimonials, null, 2)}
              </pre>
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic">No hay testimonios guardados.</p>
        )}
      </div>
    </div>
  );
} 