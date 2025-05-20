import Link from 'next/link';
import { RiceLogo } from '@/components/icons/rice-logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Header() {
  const navItems = [
    { href: '#problem-solution', label: 'What is RICE?' },
    { href: '#interactive-journey', label: 'Farmer Journey' },
    { href: '#products-services', label: 'Services' },
    { href: '#marketplace', label: 'Market Insights' },
    { href: '#crop-planner', label: 'Crop Planner' },
    { href: '#franchise-roi-calculator', label: 'Franchise ROI' },
    { href: '#farmer-impact-calculator', label: 'Farmer Impact' },
    { href: '#franchisees', label: 'Partners' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="RICE Bharat Home">
          <RiceLogo className="h-8 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <RiceLogo className="h-8 w-auto" />
                  <span className="sr-only">RICE Bharat</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground block py-1" // Added block and py-1 for better tap targets
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
