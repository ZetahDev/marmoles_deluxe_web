export interface GeoFaqItem {
  question: string;
  answer: string;
}

export const businessInfo = {
  name: "Mármoles Deluxe",
  legalName: "Mármoles Deluxe",
  url: "https://marmolesdeluxe.com",
  description:
    "Empresa familiar con más de 16 años de experiencia en suministro e instalación de mármoles, granitos y piedra sinterizada en Cali y Valle del Cauca.",
  telephone: "+57 313 259 2793",
  telephoneHref: "+573132592793",
  email: "info@marmolesdeluxe.com",
  address: {
    streetAddress: "Cra 5norte 40-43 barrio el popular",
    addressLocality: "Cali",
    addressRegion: "Valle del Cauca",
    postalCode: "760001",
    addressCountry: "CO",
  },
  geo: {
    latitude: 3.4516,
    longitude: -76.532,
  },
  openingHours: {
    opens: "08:00",
    closes: "18:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  serviceArea: ["Cali", "Valle del Cauca"],
  sameAs: [
    "https://www.instagram.com/marmolesdeluxe/",
    "https://www.facebook.com/Marmolesdeluxe",
  ],
  reviewSummary: [
    "Más de 16 años de experiencia en suministro e instalación.",
    "Atención a proyectos residenciales, comerciales y B2B.",
    "Asesoría técnica, instalación y postventa en Cali y Valle del Cauca.",
  ],
} as const;
