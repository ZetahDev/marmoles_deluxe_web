import React from "react";

const LOGO_URL =
  "https://res.cloudinary.com/dudv2dh4w/image/upload/f_auto,q_auto,dpr_auto,w_320,c_fit/marmoles-deluxe/assets/images/logo";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
}

const Loader: React.FC<LoaderProps> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-white bg-opacity-80 absolute inset-0 z-10">
      <div className={`relative animate-pulse ${sizeClasses[size]}`}>
        <img
          src={LOGO_URL}
          alt="Mármoles Deluxe"
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute animate-spin w-20 h-20 border-t-2 border-b-2 border-marmoles-gold rounded-full"></div>
    </div>
  );
};

export default Loader;
