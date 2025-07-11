import Link from "next/link";
import { Sparkles, Twitter, Instagram } from "lucide-react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent" />
                <span className="font-bold font-headline text-xl">VagyaTrisha</span>
            </div>
            <nav className="flex items-center gap-6 text-sm font-medium font-body">
                <Link href="/#about" className="opacity-70 transition-opacity hover:opacity-100">About</Link>
                <Link href="/#services" className="opacity-70 transition-opacity hover:opacity-100">Services</Link>
                <Link href="/#contact" className="opacity-70 transition-opacity hover:opacity-100">Contact</Link>
            </nav>
            <div className="flex items-center gap-4">
                <Link href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5 opacity-70 transition-opacity hover:opacity-100" />
                </Link>
                <Link href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5 opacity-70 transition-opacity hover:opacity-100" />
                </Link>
                <Link href="#" aria-label="Facebook">
                    <FacebookIcon className="h-5 w-5 opacity-70 transition-opacity hover:opacity-100" />
                </Link>
            </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-70 font-body">
            <p>&copy; {new Date().getFullYear()} VagyaTrisha. All rights reserved.</p>
            <p className="mt-2">Astrological guidance for the modern soul.</p>
        </div>
      </div>
    </footer>
  );
}
