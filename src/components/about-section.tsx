import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex justify-center">
          <Image
            src="/about_image.jpg"
            alt="Astrologer Portrait"
            width={400}
            height={400}
            className="rounded-full object-cover shadow-2xl border-4 border-accent"
            data-ai-hint="portrait man"
          />
        </div>
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Meet Your Astrologer
          </h2>
          <p className="max-w-[600px] mx-auto lg:mx-0 text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
            Hi, I&apos;m Subir Ganguly. With over two decades of experience
            studying the astrological arts, I am dedicated to providing
            insightful and compassionate guidance. My journey began with a deep
            fascination for the cosmos and its influence on our lives. I blend
            ancient wisdom with modern psychological principles to offer
            readings that are not only accurate but also deeply transformative.
            My mission is to empower you to navigate life&apos;s challenges and
            seize its opportunities with confidence and clarity.
          </p>
        </div>
      </div>
    </section>
  );
}
