import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl text-primary">
            VagyaTrisha
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-2">
          <nav className="flex items-center gap-1 text-sm font-medium font-body">
            <Button variant="ghost" asChild>
              <Link href="/#about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/#services">Services</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/#testimonials">Testimonials</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/#contact">Contact</Link>
            </Button>
          </nav>
          <Button
            asChild
            className="ml-4 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/book">Book Now</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/#about"
                  className="block px-2 py-1 text-lg font-body"
                >
                  About
                </Link>
                <Link
                  href="/#services"
                  className="block px-2 py-1 text-lg font-body"
                >
                  Services
                </Link>
                <Link
                  href="/#testimonials"
                  className="block px-2 py-1 text-lg font-body"
                >
                  Testimonials
                </Link>
                <Link
                  href="/#contact"
                  className="block px-2 py-1 text-lg font-body"
                >
                  Contact
                </Link>
                <Button
                  asChild
                  className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link href="/book">Book Now</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
