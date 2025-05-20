
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, MapPin, Users, DollarSign, TrendingUp as TrendingUpIcon } from 'lucide-react'; // Renamed to avoid conflict
import Image from 'next/image';

const highlights = [
  { icon: MapPin, text: "Exclusive local territory assignment." },
  { icon: Users, text: "Comprehensive setup kit & training." },
  { icon: DollarSign, text: "Multiple revenue streams: inputs, storage, sales." },
  { icon: TrendingUpIcon, text: "High ROI potential: 3x in 6-9 months projected." },
];

export default function FranchiseesSection() {
  return (
    <section id="franchisees" className="py-16 md:py-24 bg-amber-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Partner with RICE: <span className="text-primary">Start a RICE Center</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Become a rural entrepreneur and build a sustainable business serving farmers with RICE’s innovative platform and dedicated support.
            </p>
            
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Why Partner with Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <highlight.icon className="h-6 w-6 text-primary mr-3 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{highlight.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform transition-transform hover:scale-105">
              {/* Replace # with actual form link, e.g., Google Form */}
              <Link href="#"> 
                Apply for Franchise <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Farmer girl harvesting cabbage, representing a RICE Center franchisee opportunity"
              layout="fill"
              objectFit="cover"
              className="transform transition-transform duration-500 hover:scale-105"
              data-ai-hint="farmer harvesting"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
