import { useReducer } from "react";
import { trackFormStart, trackFormSubmit } from "../lib/analytics";

const WHATSAPP_NUMBER = "+573132592793";

interface FormData {
  nombre: string;
  empresa: string;
  cargo: string;
  telefono: string;
  ciudad: string;
  tipoProyecto: string;
  metros: string;
  descripcion: string;
  aceptoTerminos: boolean;
}

interface FormState {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  loading: boolean;
  success: boolean;
  formStarted: boolean;
}

const initialState: FormState = {
  formData: {
    nombre: "",
    empresa: "",
    cargo: "",
    telefono: "",
    ciudad: "",
    tipoProyecto: "",
    metros: "",
    descripcion: "",
    aceptoTerminos: false,
  },
  errors: {},
  loading: false,
  success: false,
  formStarted: false,
};

type Action =
  | { type: "SET_FIELD"; field: keyof FormData; value: string | boolean }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof FormData, string>> }
  | { type: "START_SUBMIT" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" }
  | { type: "CLEAR_SUCCESS" }
  | { type: "FORM_STARTED" };

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "START_SUBMIT":
      return { ...state, loading: true, success: false };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        formData: initialState.formData,
      };
    case "SUBMIT_ERROR":
      return { ...state, loading: false };
    case "CLEAR_SUCCESS":
      return { ...state, success: false };
    case "FORM_STARTED":
      return { ...state, formStarted: true };
    default:
      return state;
  }
}

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  onFocus,
}: FormInputProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className={`w-full px-4 py-3 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:ring-2 focus:ring-marmoles-gold focus:border-transparent transition-all`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function ContactFormB2B() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { formData, errors, loading, success, formStarted } = state;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    dispatch({
      type: "SET_FIELD",
      field: name as keyof FormData,
      value: type === "checkbox" ? checked : value,
    });
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

    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch({ type: "START_SUBMIT" });

    try {
      // Construir mensaje para WhatsApp
      const whatsappMessage = `
🏢 *SOLICITUD B2B - GRAN FORMATO*

👤 *Datos de Contacto:*
• Nombre: ${formData.nombre}
• Empresa: ${formData.empresa}
${formData.cargo ? `• Cargo: ${formData.cargo}` : ""}
• Teléfono: ${formData.telefono}

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
        whatsappMessage,
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
      dispatch({ type: "SUBMIT_SUCCESS" });
      setTimeout(() => dispatch({ type: "CLEAR_SUCCESS" }), 5000);
    } catch (error) {
      console.error("Error al enviar formulario B2B:", error);
      alert(
        "Hubo un error. Por favor intenta de nuevo o contáctanos directamente.",
      );
      dispatch({ type: "SUBMIT_ERROR" });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-200">
      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-200">
          ✅ ¡Solicitud enviada exitosamente! Se abrió WhatsApp para confirmar
          tu información. Nos pondremos en contacto en máximo 24 horas.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormInput
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
            placeholder="Tu nombre"
            required
            onFocus={() => {
              if (!formStarted) {
                dispatch({ type: "FORM_STARTED" });
                trackFormStart("b2b_contact_form");
              }
            }}
          />

          <FormInput
            label="Empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            error={errors.empresa}
            placeholder="Nombre de la empresa"
            required
          />

          <FormInput
            label="Cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            error={errors.cargo}
            placeholder="Ej: Arquitecto, Director de Obra"
          />

          <FormInput
            label="Teléfono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
            placeholder="+57 300 123 4567"
            required
          />

          <FormInput
            label="Ciudad del Proyecto"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            error={errors.ciudad}
            placeholder="Cali, Palmira, Jamundí..."
            required
          />
        </div>

        {/* Tipo de Proyecto */}
        <div className="mb-6">
          <label
            htmlFor="tipoProyecto"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
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

        <div className="mb-6">
          <FormInput
            label="Metros Cuadrados Estimados"
            name="metros"
            type="number"
            value={formData.metros}
            onChange={handleChange}
            placeholder="Ej: 500"
          />
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <label
            htmlFor="descripcion"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
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
              <a
                href="/politicas-garantia"
                className="text-marmoles-gold hover:underline"
              >
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
          <strong className="text-marmoles-gold">+57 313 259 2793</strong> o por
          email a{" "}
          <strong className="text-marmoles-gold">
            comercial@marmolesdeluxe.com
          </strong>
        </p>
      </form>
    </div>
  );
}
