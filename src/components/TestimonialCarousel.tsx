"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

interface TestimonialCarouselProps {
  testimonies: Array<{
    name: string
    text: string
    image: string
  }>
}

export function TestimonialCarousel({ testimonies }: TestimonialCarouselProps) {
  return (
    <div className="relative px-4">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="gap-4">
          {testimonies.map((testimony) => (
            <CarouselItem key={testimony.name} className="basis-full">
              <div className="p-4">
                <div className="bg-marbles-black text-marbles-white p-6 rounded-lg h-full flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={testimony.image} 
                      alt={testimony.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <p className="text-lg mb-4 text-center max-w-2xl">{testimony.text}</p>
                  <p className="font-semibold text-marbles-gold">{testimony.name}</p>
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
  )
} 