import React, { useRef, useState } from "react";

const carouselImgs = [
  "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Polar%20.png",
  "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Polar_desing.png",
];

export default function PromoBlancoPolarModal() {
  const [open, setOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);
  // Ref para el primer elemento del modal
  const firstModalElementRef = useRef<HTMLButtonElement>(null);

  const handlePrev = () => {
    setCarouselIndex(
      (prev) => (prev - 1 + carouselImgs.length) % carouselImgs.length
    );
  };
  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselImgs.length);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Solo cerrar si el click es en el fondo, no en el contenido
    if (e.target === modalRef.current) setOpen(false);
  };

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      // Forzar foco al primer elemento del modal
      setTimeout(() => {
        if (firstModalElementRef.current) {
          firstModalElementRef.current.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Banner Sección */}
      <section className="relative py-8 bg-marmoles-white border-b border-marmoles-gold">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mb-4 md:mb-0 rounded-lg shadow-lg border border-marmoles-gold focus:outline-none focus:ring-2 focus:ring-marmoles-gold"
            style={{
              padding: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Abrir promoción Blanco Polar"
            tabIndex={0}
          >
            <img
              src={carouselImgs[1]}
              alt="Diseño Blanco Polar impactante"
              className="w-32 h-32 object-contain rounded-lg hover:scale-105 transition-transform duration-200"
              loading="lazy"
              style={{ display: "block" }}
            />
          </button>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-marmoles-gold mb-2">
              ¡Promoción exclusiva!
            </h2>
            <p className="text-lg md:text-xl font-semibold text-marmoles-black mb-2">
              Quartzstone Blanco Polar con{" "}
              <span className="text-marmoles-gold">15% de descuento</span>
            </p>
            <p className="text-base text-gray-700 mb-4">
              Aprovecha la elegancia y resistencia del cuarzo Blanco Polar para
              tu cocina, baño o proyecto especial. Oferta por tiempo limitado.
            </p>
            <a
              href="https://wa.me/+573132592793?text=Hola,%20estoy%20interesado%20en%20la%20promoci%C3%B3n%20de%20Blanco%20Polar%20Quartzstone%20con%2030%%20de%20descuento.%20%C2%A1Quiero%20m%C3%A1s%20informaci%C3%B3n!"
              target="_blank"
              rel="noopener"
              className="bg-marmoles-gold text-marmoles-black px-6 py-2 rounded-lg font-semibold shadow hover:bg-opacity-90 transition-all"
            >
              ¡Solicita por WhatsApp!
            </a>
          </div>
        </div>

        {/* Modal */}
        {open && (
          <dialog
            ref={modalRef}
            open={open}
            onClick={handleBackdropClick}
            style={{
              display: "flex",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
              background: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                maxWidth: 500,
                width: "90vw",
                padding: "2rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                position: "relative",
              }}
            >
              <button
                ref={firstModalElementRef}
                onClick={() => setOpen(false)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                aria-label="Cerrar modal"
              >
                &times;
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: "1rem",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={handlePrev}
                  style={{
                    background: "#fff",
                    border: "1px solid #e6c200",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                  aria-label="Imagen anterior"
                >
                  &#8592;
                </button>
                <div
                  style={{
                    width: 400,
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={carouselImgs[carouselIndex]}
                    alt="Blanco Polar"
                    style={{
                      width: "100%",
                      maxWidth: 400,
                      height: 180,
                      objectFit: "contain",
                      borderRadius: "0.5rem",
                      border: "2px solid #e6c200",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </div>
                <button
                  onClick={handleNext}
                  style={{
                    background: "#fff",
                    border: "1px solid #e6c200",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                  aria-label="Imagen siguiente"
                >
                  &#8594;
                </button>
              </div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#222",
                  marginBottom: "0.5rem",
                }}
              >
                Blanco Polar
              </h2>
              <p
                style={{
                  color: "#444",
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                Transforma tu cocina o baño con el cuarzo Blanco Polar.
                Moderniza tu espacio, aumenta el valor de tu hogar y disfruta de
                una superficie luminosa, resistente y fácil de limpiar.
              </p>
              <div style={{ width: "100%", marginBottom: "2rem" }}>
                <strong>Beneficios</strong>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li
                    style={{
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#e6c200",
                        fontSize: "1.2rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      &#10003;
                    </span>{" "}
                    Estilo moderno y luminoso
                  </li>
                  <li
                    style={{
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#e6c200",
                        fontSize: "1.2rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      &#10003;
                    </span>{" "}
                    Fácil limpieza y bajo mantenimiento
                  </li>
                  <li
                    style={{
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#e6c200",
                        fontSize: "1.2rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      &#10003;
                    </span>{" "}
                    Durabilidad garantizada
                  </li>
                  <li
                    style={{
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#e6c200",
                        fontSize: "1.2rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      &#10003;
                    </span>{" "}
                    Oferta exclusiva por tiempo limitado
                  </li>
                </ul>
              </div>
              <a
                href="https://wa.me/+573132592793?text=Hola,%20quiero%20aprovechar%20la%20promoci%C3%B3n%20de%20Blanco%20Polar%20Quartzstone%20con%2030%%20de%20descuento.%20%C2%A1Contáctenme!"
                target="_blank"
                rel="noopener"
                style={{
                  display: "block",
                  width: "100%",
                  background: "#222",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  textAlign: "center",
                  textDecoration: "none",
                  marginTop: "1rem",
                }}
              >
                Solicitar por WhatsApp
              </a>
            </div>
          </dialog>
        )}
      </section>
    </>
  );
}
