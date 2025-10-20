import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// EmailJS configuration - ACTUALIZA ESTOS VALORES CON TUS CREDENCIALES
const SERVICE_ID = "service_na9o3ub"; // TODO: Actualizar con tu Service ID
const TEMPLATE_ID = "template_bll1rds"; // TODO: Actualizar con tu Template ID
const PUBLIC_KEY = "YsOXeIbRezMr8efGI"; // TODO: Actualizar con tu Public Key

// Número de WhatsApp para respaldo
const WHATSAPP_NUMBER = "+573132592793";

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
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
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
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
      // Preparar el mensaje
      const combinedMessage = `Teléfono: ${formData.phone}\n\n${formData.message}`;

      // Crear un objeto con los campos que espera la plantilla de EmailJS
      const templateParams = {
        title: "Nueva solicitud de visita técnica - 15% descuento web",
        name: formData.name,
        email: formData.email,
        message: combinedMessage,
      };

      // Intentar enviar por email
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("✅ Correo enviado exitosamente!");
      } catch (emailError) {
        console.warn("⚠️ No se pudo enviar por email:", emailError);
      }

      // SIEMPRE enviar por WhatsApp como respaldo
      const whatsappMessage = `
🔔 *Nueva Solicitud de Visita Técnica*
💰 *Promoción: 15% de descuento por compra web*

👤 *Nombre:* ${formData.name}
📞 *Teléfono:* ${formData.phone}
📧 *Email:* ${formData.email}

📝 *Mensaje:*
${formData.message}
      `.trim();

      // Abrir WhatsApp en nueva ventana
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");

      // Mostrar mensaje de éxito y resetear formulario
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("❌ Error al procesar el formulario:", error);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-marmoles-black mb-2">
        Solicita tu Visita Técnica
      </h2>
      <p className="text-marmoles-gold font-semibold mb-4">
        🎉 ¡Obtén 15% de descuento en tu compra por solicitar a través de la
        web!
      </p>

      {/* Mensaje de éxito */}
      {success && (
        <div className="mb-6 p-4 rounded-md bg-green-50 text-green-700 border border-green-200">
          ✅ ¡Solicitud enviada! Se abrirá WhatsApp para confirmar tu
          información. Nos pondremos en contacto contigo pronto.
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 p-4 rounded-md bg-yellow-50 text-yellow-700 border border-yellow-200">
          ⚠️ Se abrirá WhatsApp para enviar tu solicitud. Si tienes problemas,
          contáctanos directamente al +57 313 259 2793
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Campo Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-marmoles-gold"
              } focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`}
              placeholder="Tu nombre"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-marmoles-gold"
              } focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`}
              placeholder="Tu teléfono"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Campo Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-500" : "border-marmoles-gold"
            } focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`}
            placeholder="Tu correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Campo Mensaje */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? "border-red-500" : "border-marmoles-gold"
            } focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`}
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
          focus:ring-offset-2 focus:ring-marmoles-gold ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Enviando..." : "📧 Enviar Solicitud (Email + WhatsApp)"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Tu solicitud se enviará por email y WhatsApp para garantizar que la
          recibamos
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
