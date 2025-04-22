import { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import FilesList from './FilesList';
import { deleteFile } from '../../lib/uploadthing';
import toast from 'react-hot-toast';

// Tipos de contenido que se pueden subir
const CONTENT_TYPES = [
  { id: 'galeria', name: 'Galería', description: 'Imágenes para la sección de galería' },
  { id: 'materiales', name: 'Materiales', description: 'Imágenes de tipos de materiales' },
  { id: 'testimonios', name: 'Testimonios', description: 'Fotos de clientes y testimonios' }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('galeria');
  const [files, setFiles] = useState({
    galeria: [],
    materiales: [],
    testimonios: []
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Verificar autenticación
    const authStatus = localStorage.getItem('marmolesAdmin');
    setIsAuthenticated(authStatus === 'authenticated');
    
    // Cargar archivos del localStorage (simulando una base de datos)
    const savedFiles = localStorage.getItem('marmolesFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  // Si no está autenticado, no mostrar el panel
  if (!isAuthenticated) return null;

  const handleFileUpload = (fileData) => {
    // Actualizar estado con la respuesta del servicio de carga
    const updatedFiles = {
      ...files,
      [activeTab]: [...files[activeTab], fileData]
    };
    
    setFiles(updatedFiles);
    
    // Guardar en localStorage
    localStorage.setItem('marmolesFiles', JSON.stringify(updatedFiles));
  };

  const handleDeleteFile = async (fileId) => {
    try {
      setIsDeleting(true);
      
      // Encontrar el archivo a eliminar
      const fileToDelete = files[activeTab].find(file => file.id === fileId);
      
      if (fileToDelete) {
        // Llamar al servicio de eliminación
        await deleteFile(fileToDelete.key);
        
        // Filtrar el archivo eliminado
        const updatedTabFiles = files[activeTab].filter(file => file.id !== fileId);
        
        const updatedFiles = {
          ...files,
          [activeTab]: updatedTabFiles
        };
        
        setFiles(updatedFiles);
        localStorage.setItem('marmolesFiles', JSON.stringify(updatedFiles));
        
        toast.success('Archivo eliminado correctamente');
      }
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      toast.error('Hubo un error al eliminar el archivo');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6">
          {CONTENT_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === type.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {type.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">
          Subir archivos para {CONTENT_TYPES.find(t => t.id === activeTab)?.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {CONTENT_TYPES.find(t => t.id === activeTab)?.description}
        </p>
        
        <FileUploader onFileUpload={handleFileUpload} contentType={activeTab} />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Archivos subidos</h3>
        <FilesList 
          files={files[activeTab]} 
          onDelete={handleDeleteFile}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
} 