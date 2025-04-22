import { useState } from 'react';
import toast from 'react-hot-toast';

export default function FilesList({ files, onDelete, isDeleting }) {
  const [copyingId, setCopyingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Formatear el tamaño del archivo a una representación legible
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Formatear la fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Copiar la URL al portapapeles
  const copyToClipboard = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyingId(id);
      toast.success('URL copiada al portapapeles');
      
      // Restablecer el estado después de 2 segundos
      setTimeout(() => {
        setCopyingId(null);
      }, 2000);
    } catch (err) {
      toast.error('Error al copiar la URL');
    }
  };

  // Manejar la eliminación con confirmación
  const handleDelete = async (fileId, fileName) => {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar "${fileName}"?`);
    
    if (confirmed) {
      setDeletingId(fileId);
      await onDelete(fileId);
      setDeletingId(null);
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay archivos subidos en esta categoría</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Imagen
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tamaño
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.map((file) => (
            <tr key={file.id} className={deletingId === file.id ? 'bg-red-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-12 w-12 overflow-hidden rounded">
                  <img 
                    src={file.url} 
                    alt={file.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{file.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{formatDate(file.uploadedAt)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(file.url, file.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      copyingId === file.id
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                    disabled={isDeleting || deletingId === file.id}
                  >
                    {copyingId === file.id ? 'Copiado ✓' : 'Copiar URL'}
                  </button>
                  <button
                    onClick={() => handleDelete(file.id, file.name)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      deletingId === file.id
                        ? 'bg-red-200 text-red-800'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                    disabled={isDeleting || deletingId === file.id}
                  >
                    {deletingId === file.id ? (
                      <>
                        <span className="inline-block h-3 w-3 mr-1 animate-pulse bg-red-600 rounded-full"></span>
                        Eliminando...
                      </>
                    ) : (
                      'Eliminar'
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}