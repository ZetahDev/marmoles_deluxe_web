import React, { useState, useEffect } from "react";
import MaterialModal from "./MaterialModal";

interface Stone {
  name: string;
  image: string;
  design: string;
}

interface InitialMaterialModalProps {
  material: Stone | null;
  categoryTitle: string;
  categoryFeatures?: string[];
}

/**
 * Component that renders a MaterialModal that starts open based on server-side data.
 * This bypasses pagination issues by rendering the modal directly at page level.
 */
export default function InitialMaterialModal({
  material,
  categoryTitle,
  categoryFeatures = [],
}: InitialMaterialModalProps) {
  const [isOpen, setIsOpen] = useState(true); // Start open!

  // Close handler
  const handleClose = () => {
    setIsOpen(false);
    // Clean up URL when modal closes
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("material");
      window.history.replaceState({}, "", url.pathname);
    }
  };

  // If no material provided, don't render anything
  if (!material) {
    return null;
  }

  const images = [material.image, material.design].filter(Boolean);

  return (
    <MaterialModal
      title={material.name}
      description="Piedra sinterizada de alta calidad"
      image={material.image}
      images={images}
      features={categoryFeatures}
      category={categoryTitle}
      isOpen={isOpen}
      onClose={handleClose}
    />
  );
}
