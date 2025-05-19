import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative bg-gradient-to-b from-background to-amber-50/50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="absolute inset-0 opacity-10">
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Rural landscape with technology integration"
              layout="fill"
              objectFit="cover"
              quality={80}
              priority
              data-ai-hint="farmer app warehouse"
            />
        </div>
        <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Empowering <span className="text-primary">Bharat&apos;s Small Farmers</span> with Smart Tools, Storage & Markets
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            RICE is India’s first rural-first AgriTech super app + micro-warehouse network designed to help small farmers grow better, earn better, and sell smarter.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform transition-transform hover:scale-105">
                <Link href="#contact">
                Join as Farmer <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 shadow-md transform transition-transform hover:scale-105">
                <Link href="/#franchisees">
                Become a Franchisee
                </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-primary hover:bg-primary/10 transform transition-transform hover:scale-105">
                <Link href="#waitlist">
                Get Early Access
                </Link>
            </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
