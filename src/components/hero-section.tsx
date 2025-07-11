import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center"
    >
      <Image
        src="/hero_section_image.png"
        alt="A mystical starry sky representing the cosmos."
        fill
        className="object-cover"
        data-ai-hint="starry night"
        priority
      />
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative z-10 text-center">
        <div className="container px-4 md:px-6 text-primary-foreground max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Navigate Your Destiny with Astrological Guidance
          </h1>
          <p className="mt-6 text-lg leading-8 md:text-xl font-body">
            Unlock the secrets of the cosmos. Discover your path to
            self-awareness, love, and success with personalized astrological
            readings.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/#services">Book an Appointment</Link>
            </Button>
            <Button
              asChild
              variant="link"
              size="lg"
              className="text-primary-foreground hover:text-primary-foreground/80"
            >
              <Link href="/#about">Learn More &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
