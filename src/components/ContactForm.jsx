import { useReducer, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  trackFormStart,
  trackFormSubmit,
  trackFormAbandonment,
  openWhatsAppTracked,
} from "../lib/analytics";

// EmailJS configuration - ACTUALIZA ESTOS VALORES CON TUS CREDENCIALES
const SERVICE_ID = "service_na9o3ub"; // TODO: Actualizar con tu Service ID
const TEMPLATE_ID = "template_bll1rds"; // TODO: Actualizar con tu Template ID
const PUBLIC_KEY = "YsOXeIbRezMr8efGI"; // TODO: Actualizar con tu Public Key

// Número de WhatsApp para respaldo
const WHATSAPP_NUMBER = "+573132592793";

const initialState = {
  formData: { name: "", phone: "", message: "" },
  errors: {},
  loading: false,
  success: false,
  error: false,
  formStarted: false,
  formSubmitted: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "START_SUBMIT":
      return { ...state, loading: true, success: false, error: false };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        formSubmitted: true,
        formData: initialState.formData,
      };
    case "SUBMIT_ERROR":
      return { ...state, loading: false, error: true };
    case "CLEAR_SUCCESS":
      return { ...state, success: false };
    case "CLEAR_ERROR_ALERT":
      return { ...state, error: false };
    case "FORM_STARTED":
      return { ...state, formStarted: true };
    default:
      return state;
  }
}

const ContactForm = () => {
  const formRef = useRef();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { formData, errors, loading, success, error, formStarted, formSubmitted } = state;

  // Trackear abandono de formulario al desmontar
  useEffect(() => {
    return () => {
      if (formStarted && !formSubmitted) {
        const totalFields = 4;
        const completedFields = Object.values(formData).filter(
          (v) => v.trim() !== "",
        ).length;
        trackFormAbandonment("contact_form", completedFields, totalFields);
      }
    };
  }, [formStarted, formSubmitted, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El WhatsApp es requerido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    }

    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch({ type: "START_SUBMIT" });

    try {
      // Preparar el mensaje
      const combinedMessage = `Teléfono: ${formData.phone}\n\n${formData.message}`;

      // Crear un objeto con los campos que espera la plantilla de EmailJS
      const templateParams = {
        title: "Nueva solicitud de visita técnica",
        name: formData.name,
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

👤 *Nombre:* ${formData.name}
📞 *WhatsApp:* ${formData.phone}

📝 *Mensaje:*
${formData.message}
      `.trim();

      // Abrir WhatsApp en nueva ventana
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        whatsappMessage,
      )}`;
      openWhatsAppTracked(whatsappUrl, "contact_form_submit");

      // Trackear envío exitoso
      trackFormSubmit("contact_form", {
        has_phone: !!formData.phone,
        message_length: formData.message.length,
      });

      // Mostrar mensaje de éxito y resetear formulario
      dispatch({ type: "SUBMIT_SUCCESS" });
      setTimeout(() => dispatch({ type: "CLEAR_SUCCESS" }), 5000);
    } catch (submitError) {
      console.error("❌ Error al procesar el formulario:", submitError);
      dispatch({ type: "SUBMIT_ERROR" });
      setTimeout(() => dispatch({ type: "CLEAR_ERROR_ALERT" }), 5000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-marmoles-black mb-2">
        Solicita tu Visita Técnica
      </h2>

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
              onFocus={() => {
                if (!formStarted) {
                  dispatch({ type: "FORM_STARTED" });
                  trackFormStart("contact_form");
                }
              }}
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
              WhatsApp
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
              placeholder="Tu número de WhatsApp"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
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
          {loading ? "Enviando..." : "Enviar Solicitud"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Tu solicitud se enviará por WhatsApp para una atención ágil y
          personalizada
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
