"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Hash, Home, Moon, Orbit, Star } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "natal-chart-reading",
    icon: Star,
    title: "Natal Chart Reading",
    description:
      "A deep dive into your personal birth chart. Understand your strengths, weaknesses, and life's purpose.",
    price: "₹701",
  },
  {
    id: "synastry-reading",
    icon: Moon,
    title: "Synastry (Couples) Reading",
    description:
      "Explore the dynamics of your relationship. A comparative analysis of two birth charts to understand compatibility.",
    price: "₹1101",
  },
  {
    id: "vastu-shastra",
    icon: Home,
    title: "Vastu Shastra",
    description:
      "Harmonize your living or workspace. Guidance on selecting a property or arranging your space for optimal energy flow.",
    price: "₹1501",
  },
  {
    id: "numerology-reading",
    icon: Hash,
    title: "Numerology Reading",
    description:
      "Uncover the mystical significance of numbers in your life. Learn about your life path, expression, and destiny numbers.",
    price: "₹701",
  },
  {
    id: "career-vocation",
    icon: Orbit,
    title: "Career & Vocation",
    description:
      "Align your career with your cosmic calling. This reading focuses on identifying your professional strengths and path.",
    price: "₹601",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full py-16 md:py-24 lg:py-32 bg-secondary/50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Our Astrological Services
          </h2>
          <p className="max-w-[700px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
            Choose from a range of specialized readings designed to illuminate
            your path.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="flex flex-col text-center hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="font-body text-foreground/80">
                      {service.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center gap-4 pt-4 mt-auto">
                    <p className="text-3xl font-bold text-primary font-headline">
                      {service.price}
                    </p>
                    <Button
                      asChild
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Link href={`/book?service=${service.id}`}>Book Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
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
