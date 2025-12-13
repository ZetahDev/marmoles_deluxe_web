import { useState } from "react";
import { trackFormStart, trackFormSubmit } from "../lib/analytics";

const WHATSAPP_NUMBER = "+573132592793";

interface FormData {
  nombre: string;
  empresa: string;
  cargo: string;
  telefono: string;
  email: string;
  ciudad: string;
  tipoProyecto: string;
  metros: string;
  descripcion: string;
  aceptoTerminos: boolean;
}

export default function ContactFormB2B() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    empresa: "",
    cargo: "",
    telefono: "",
    email: "",
    ciudad: "",
    tipoProyecto: "",
    metros: "",
    descripcion: "",
    aceptoTerminos: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpiar error del campo
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = "La empresa es requerida";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.telefono)) {
      newErrors.telefono = "Teléfono inválido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.ciudad.trim()) {
      newErrors.ciudad = "La ciudad es requerida";
    }

    if (!formData.tipoProyecto) {
      newErrors.tipoProyecto = "Selecciona el tipo de proyecto";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }

    if (!formData.aceptoTerminos) {
      newErrors.aceptoTerminos = "Debes aceptar los términos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Construir mensaje para WhatsApp
      const whatsappMessage = `
🏢 *SOLICITUD B2B - GRAN FORMATO*

👤 *Datos de Contacto:*
• Nombre: ${formData.nombre}
• Empresa: ${formData.empresa}
${formData.cargo ? `• Cargo: ${formData.cargo}` : ""}
• Teléfono: ${formData.telefono}
• Email: ${formData.email}

📍 *Proyecto:*
• Tipo: ${formData.tipoProyecto}
• Ciudad: ${formData.ciudad}
${formData.metros ? `• M² estimados: ${formData.metros}` : ""}

📝 *Descripción:*
${formData.descripcion}

---
Solicitud enviada desde www.marmolesdeluxe.com/proyectos
      `.trim();

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      // Abrir WhatsApp
      window.open(whatsappUrl, "_blank");

      // Trackear envío
      trackFormSubmit("b2b_contact_form", {
        tipo_proyecto: formData.tipoProyecto,
        ciudad: formData.ciudad,
        metros: formData.metros || "no_especificado",
      });

      // Mostrar éxito
      setSuccess(true);
      setFormData({
        nombre: "",
        empresa: "",
        cargo: "",
        telefono: "",
        email: "",
        ciudad: "",
        tipoProyecto: "",
        metros: "",
        descripcion: "",
        aceptoTerminos: false,
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error al enviar formulario B2B:", error);
      alert("Hubo un error. Por favor intenta de nuevo o contáctanos directamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-200">
      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-200">
          ✅ ¡Solicitud enviada exitosamente! Se abrió WhatsApp para confirmar tu información.
          Nos pondremos en contacto en máximo 24 horas.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onFocus={() => {
                if (!formStarted) {
                  setFormStarted(true);
                  trackFormStart("b2b_contact_form");
                }
              }}
              className={`w-full px-4 py-3 border ${
                errors.nombre ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all`}
              placeholder="Tu nombre"
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </div>

          {/* Empresa */}
          <div>
            <label htmlFor="empresa" className="block text-sm font-semibold text-gray-700 mb-2">
              Empresa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.empresa ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all`}
              placeholder="Nombre de la empresa"
            />
            {errors.empresa && <p className="text-red-500 text-sm mt-1">{errors.empresa}</p>}
          </div>

          {/* Cargo */}
          <div>
            <label htmlFor="cargo" className="block text-sm font-semibold text-gray-700 mb-2">
              Cargo
            </label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all"
              placeholder="Ej: Arquitecto, Director de Obra"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.telefono ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all`}
              placeholder="+57 300 123 4567"
            />
            {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all`}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Ciudad */}
          <div>
            <label htmlFor="ciudad" className="block text-sm font-semibold text-gray-700 mb-2">
              Ciudad del Proyecto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.ciudad ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all`}
              placeholder="Cali, Palmira, Jamundí..."
            />
            {errors.ciudad && <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>}
          </div>
        </div>

        {/* Tipo de Proyecto */}
        <div className="mb-6">
          <label htmlFor="tipoProyecto" className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Proyecto <span className="text-red-500">*</span>
          </label>
          <select
            id="tipoProyecto"
            name="tipoProyecto"
            value={formData.tipoProyecto}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.tipoProyecto ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all`}
          >
            <option value="">Selecciona una opción</option>
            <option value="Residencial">Proyecto Residencial</option>
            <option value="Comercial">Centro Comercial / Retail</option>
            <option value="Corporativo">Edificio Corporativo</option>
            <option value="Hotelería">Hotel / Restaurante</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.tipoProyecto && (
            <p className="text-red-500 text-sm mt-1">{errors.tipoProyecto}</p>
          )}
        </div>

        {/* Metros Cuadrados */}
        <div className="mb-6">
          <label htmlFor="metros" className="block text-sm font-semibold text-gray-700 mb-2">
            Metros Cuadrados Estimados
          </label>
          <input
            type="number"
            id="metros"
            name="metros"
            min="0"
            value={formData.metros}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all"
            placeholder="Ej: 500"
          />
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción del Proyecto <span className="text-red-500">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={4}
            value={formData.descripcion}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.descripcion ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all resize-none`}
            placeholder="Cuéntanos sobre tu proyecto: aplicaciones, materiales de interés, cronograma, etc."
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
          )}
        </div>

        {/* Términos */}
        <div className="mb-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="aceptoTerminos"
              checked={formData.aceptoTerminos}
              onChange={handleChange}
              className="mt-1 mr-3 w-5 h-5 text-marmoles-gold border-gray-300 rounded focus:ring-marmoles-gold"
            />
            <span className="text-sm text-gray-600">
              Acepto el tratamiento de mis datos personales según las{" "}
              <a href="/politicas-garantia" className="text-marmoles-gold hover:underline">
                políticas de privacidad
              </a>
              .
            </span>
          </label>
          {errors.aceptoTerminos && (
            <p className="text-red-500 text-sm mt-1">{errors.aceptoTerminos}</p>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-marmoles-gold text-marmoles-black py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar Solicitud de Cotización"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          También puedes contactarnos directamente al{" "}
          <strong className="text-marmoles-gold">+57 313 259 2793</strong> o por email a{" "}
          <strong className="text-marmoles-gold">comercial@marmolesdeluxe.com</strong>
        </p>
      </form>
    </div>
  );
}
