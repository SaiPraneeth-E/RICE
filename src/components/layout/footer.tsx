import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

export default function Footer() {
  const footerLinks = [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '/#franchisees', label: 'Apply as Franchisee' },
    { href: '#', label: 'Join Waitlist' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="RICE Bharat Home">
              <Image 
                src="https://i.postimg.cc/FKX6pdCw/ricelogo.jpg" 
                alt="RICE Bharat Logo" 
                width={120}  // Adjust as per your logo's aspect ratio
                height={30} // Adjust as per your logo's aspect ratio
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering India&apos;s small farmers through technology and innovation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+919030822369" className="hover:text-primary transition-colors">+91 90308 22369</a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 text-primary" />
                <a href="https://wa.me/919030822369" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:rice140624@gmail.com" className="hover:text-primary transition-colors">rice140624@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">Main Office:</span>
                  <a href="https://maps.app.goo.gl/iQ3ybKUJhkiMB48b7" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Palamaner, Chittoor <ExternalLink className="inline-block h-3 w-3 ml-1" />
                  </a>
                  <span className="block text-sm">Andhra Pradesh, India</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-2">Stay updated with rural schemes and investor news.</p>
            {/* Basic newsletter signup form - actual functionality would require backend */}
            <form className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="flex-grow p-2 border rounded-md text-sm bg-background focus:ring-primary focus:border-primary" />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} RICE Bharat. All rights reserved.</p>
          <p className="mt-1">
            Design inspired by the RICE Bharat vision.
          </p>
        </div>
      </div>
    </footer>
  );
}
