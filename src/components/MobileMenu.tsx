import React, { useEffect } from "react";
import { useNavbarStore } from "../store/navbar";

interface NavItem {
  href?: string;
  label: string;
  isLogo?: boolean;
  items?: Array<{ href: string; label: string }>;
}

interface MobileMenuProps {
  navItems: NavItem[];
  currentPath: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, currentPath }) => {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } =
    useNavbarStore();

  console.log("[MobileMenu] Component mounted");
  console.log("[MobileMenu] isMobileMenuOpen:", isMobileMenuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    console.log(
      "[MobileMenu] useEffect running, isMobileMenuOpen:",
      isMobileMenuOpen
    );

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      console.log("[MobileMenu] Click detected:", target);
      if (
        isMobileMenuOpen &&
        !target.closest("#mobile-menu") &&
        !target.closest("#mobile-menu-button")
      ) {
        console.log("[MobileMenu] Closing menu - click outside");
        setMobileMenuOpen(false);
      }
    };

    // Close menu when pressing escape
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("[MobileMenu] Closing menu - ESC pressed");
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      console.log("[MobileMenu] Cleaning up event listeners");
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen, setMobileMenuOpen]);

  // Toggle submenu visibility
  const toggleSubmenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const submenu = (event.currentTarget as HTMLElement)
      .nextElementSibling as HTMLElement;
    if (submenu) {
      submenu.classList.toggle("hidden");
    }
  };

  return (
    <>
      <button
        className="md:hidden p-2 text-marmoles-gold hover:text-marmoles-gold transition-colors"
        id="mobile-menu-button"
        aria-label="Menú"
        onClick={() => {
          console.log(
            "[MobileMenu] Button clicked! Current state:",
            isMobileMenuOpen
          );
          toggleMobileMenu();
          console.log("[MobileMenu] After toggle");
        }}
        aria-expanded={isMobileMenuOpen}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          )}
        </svg>
      </button>

      {/* Overlay oscuro de fondo */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 top-16"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white/80 backdrop-blur-md border-b border-white/20 text-gray-800 shadow-2xl transition-all duration-300 z-50 ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-4 py-3 space-y-3">
          {navItems.map((item, index) => {
            if (item.isLogo) {
              return null;
            }
            if (item.items) {
              return (
                <div className="space-y-2" key={`mobile-item-${index}`}>
                  <button
                    className="text-sm font-medium text-gray-800 hover:text-marmoles-gold w-full text-left flex justify-between items-center transition-colors"
                    onClick={toggleSubmenu}
                  >
                    {item.label}
                    <svg
                      className="h-4 w-4 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="hidden pl-4 space-y-2">
                    {item.items.map(({ href, label }, subIndex) => (
                      <a
                        href={href}
                        className={`block text-sm font-medium hover:text-marmoles-gold py-2 transition-colors ${
                          currentPath === href || currentPath.endsWith(href)
                            ? "text-marmoles-gold"
                            : "text-gray-800"
                        }`}
                        key={`mobile-subitem-${index}-${subIndex}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <a
                href={item.href}
                className={`block text-sm font-medium py-2 transition-colors ${
                  item.href &&
                  (currentPath === item.href || currentPath.endsWith(item.href))
                    ? "text-marmoles-gold"
                    : "text-gray-800 hover:text-marmoles-gold"
                }`}
                key={`mobile-item-${index}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
