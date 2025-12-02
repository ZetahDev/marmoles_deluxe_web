"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface CarouselWrapperProps {
  items: Array<{
    image: string;
    title: string;
    description: string;
  }>;
}

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ items }) => {
  return (
    <div className="relative px-4">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="gap-4">
          {items.map((item) => (
            <CarouselItem key={item.title} className="basis-full">
              <div className="p-4">
                <div className="bg-marmoles-black text-marmoles-white rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover"
                    width="600"
                    height="400"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-lg">{item.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};
