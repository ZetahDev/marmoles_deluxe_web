import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = "service_na9o3ub";
const TEMPLATE_ID = "template_bll1rds";
const PUBLIC_KEY = "YsOXeIbRezMr8efGI";
const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const combinedMessage = `Teléfono: ${formData.phone}

${formData.message}`;
      const templateParams = {
        title: "Nueva solicitud desde el sitio web",
        name: formData.name,
        email: formData.email,
        message: combinedMessage
      };
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      console.log("¡Correo enviado exitosamente!");
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5e3);
    } catch (error2) {
      console.error("Error al enviar el mensaje:", error2);
      setError(true);
      setTimeout(() => setError(false), 5e3);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 md:p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-marmoles-black mb-6", children: "Solicita tu Visita Técnica" }),
    success && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 rounded-md bg-green-50 text-green-700 border border-green-200", children: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto." }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 rounded-md bg-red-50 text-red-700 border border-red-200", children: "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente." }),
    /* @__PURE__ */ jsxs("form", { ref: formRef, onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "name",
              name: "name",
              value: formData.name,
              onChange: handleChange,
              className: `w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-marmoles-gold"} focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`,
              placeholder: "Tu nombre"
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 mb-1", children: "Teléfono" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              id: "phone",
              name: "phone",
              value: formData.phone,
              onChange: handleChange,
              className: `w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-marmoles-gold"} focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`,
              placeholder: "Tu teléfono"
            }
          ),
          errors.phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.phone })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Correo electrónico" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            value: formData.email,
            onChange: handleChange,
            className: `w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-marmoles-gold"} focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`,
            placeholder: "Tu correo electrónico"
          }
        ),
        errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700 mb-1", children: "Mensaje" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "message",
            name: "message",
            value: formData.message,
            onChange: handleChange,
            rows: "4",
            className: `w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-marmoles-gold"} focus:outline-none focus:ring-2 focus:ring-marmoles-gold transition-all`,
            placeholder: "¿En qué podemos ayudarte?"
          }
        ),
        errors.message && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.message })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `w-full bg-marmoles-gold text-white font-semibold py-3 px-6 rounded-lg
          transition-all duration-300 hover:bg-opacity-90 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-marmoles-gold ${loading ? "opacity-70 cursor-not-allowed" : ""}`,
          children: loading ? "Enviando..." : "Enviar Solicitud"
        }
      )
    ] })
  ] });
};

export { ContactForm as C };
