"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface TestimonialCarouselProps {
  testimonies: Array<{
    name: string;
    text: string;
  }>;
}

export function TestimonialCarousel({ testimonies }: TestimonialCarouselProps) {
  return (
    <div className="relative px-4">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="gap-4">
          {testimonies.map((testimony) => (
            <CarouselItem key={testimony.name} className="basis-full">
              <div className="p-4">
                <div className="bg-marmoles-black text-marmoles-white p-6 rounded-lg h-full flex flex-col items-center justify-center">
                  <p className="text-lg mb-4 text-center max-w-2xl text-gray-300 italic">
                    "{testimony.text}"
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-marmoles-gold">★★★★★</span>
                    <p className="font-semibold text-white">{testimony.name}</p>
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
}
