"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "SL",
    text: "The reading was incredibly accurate and insightful. It gave me the clarity I was searching for. I feel more confident in my decisions now.",
    rating: 5,
  },
  {
    name: "Michael B.",
    avatar: "MB",
    text: "A truly transformative experience. I learned so much about myself and my relationship dynamics. Highly recommended for anyone at a crossroads.",
    rating: 5,
  },
  {
    name: "Jessica P.",
    avatar: "JP",
    text: "I was skeptical at first, but the depth of the analysis was astounding. It felt like a therapy session with the universe. I'll definitely be back for a follow-up.",
    rating: 5,
  },
   {
    name: "David C.",
    avatar: "DC",
    text: "The career reading helped me finally make a professional leap I'd been dreading. I'm now in a job that feels completely aligned with my spirit.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">Words from Our Clients</h2>
          <p className="max-w-[700px] text-foreground/80 md:text-xl/relaxed font-body">
            Hear from clients who have found clarity and direction through my readings.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-2">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4 h-full">
                      <Avatar className="w-16 h-16 border-2 border-accent">
                        <AvatarImage src={`https://placehold.co/64x64.png?text=${testimonial.avatar}`} />
                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <p className="font-body text-foreground/90 flex-grow">"{testimonial.text}"</p>
                      <div className="flex items-center gap-0.5 pt-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                           <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="font-bold font-headline text-lg text-primary">{testimonial.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
