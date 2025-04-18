import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS configuration with actual values
const SERVICE_ID = 'service_na9o3ub';    // ID del servicio en EmailJS
const TEMPLATE_ID = 'template_bll1rds';  // ID de la plantilla en EmailJS
const PUBLIC_KEY = 'YsOXeIbRezMr8efGI';  // Clave pública de tu cuenta EmailJS

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess(false);
    setError(false);
    
    try {
      // Preparar el mensaje combinando el teléfono con el mensaje
      const combinedMessage = `Teléfono: ${formData.phone}\n\n${formData.message}`;
      
      // Crear un objeto con los campos que espera la plantilla de EmailJS
      const templateParams = {
        title: "Nueva solicitud desde el sitio web",
        name: formData.name,
        email: formData.email,
        message: combinedMessage,
      };
      
      // Enviar usando emailjs.send en lugar de sendForm para tener más control
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      
      console.log('¡Correo enviado exitosamente!');
      
      // Mostrar mensaje de éxito y resetear formulario
      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000); // Ocultar mensaje después de 5 segundos
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setError(true);
      setTimeout(() => setError(false), 5000); // Ocultar mensaje después de 5 segundos
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-marmoles-black mb-6">Solicita tu Visita Técnica</h2>
      
      {/* Mensaje de éxito */}
      {success && (
        <div className="mb-6 p-4 rounded-md bg-green-50 text-green-700 border border-green-200">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
        </div>
      )}
      
      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 text-red-700 border border-red-200">
          Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente.
        </div>
      )}
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Campo Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-marmoles-gold'} focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`}
              placeholder="Tu nombre"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          {/* Campo Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-marmoles-gold'} focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`}
              placeholder="Tu teléfono"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
        
        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-marmoles-gold'} focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`}
            placeholder="Tu correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        {/* Campo Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-marmoles-gold'} focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`}
            placeholder="¿En qué podemos ayudarte?"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        
        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-marmoles-gold text-white font-semibold py-3 px-6 rounded-lg
          transition-all duration-300 hover:bg-opacity-90 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-marmoles-gold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm; 