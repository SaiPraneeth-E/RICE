import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Heart } from 'lucide-react';

const coreValues = [
  { icon: UsersIcon, name: "Inclusion", description: "Empowering every farmer, irrespective of scale." },
  { icon: LightbulbIcon, name: "Innovation", description: "Leveraging technology for agricultural advancement." },
  { icon: ShieldCheckIcon, name: "Integrity", description: "Transparent and ethical practices in all dealings." },
];

// Custom SVG icons as Lucide doesn't have specific ones
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );
}

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9.2 18 8A6 6 0 0 0 6 8c0 1.2.3 2.2 1.5 3.5.7.7 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  );
}


export default function ImpactVisionSection() {
  return (
    <section id="impact-vision" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Impact &amp; Vision</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Driving agricultural transformation with a clear mission and strong values.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 items-stretch">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="mr-3 h-7 w-7 text-primary" />
                Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-muted-foreground">
                Empower <span className="font-semibold text-primary">1 Million+</span> farmers by 2028 through accessible technology and fair market linkages.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Eye className="mr-3 h-7 w-7 text-primary" />
                Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-muted-foreground">
                To build India’s agricultural <span className="font-semibold text-primary">Operating System (OS)</span>, fostering a sustainable and prosperous rural economy.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center text-foreground mb-8">Core Values</h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {coreValues.map((value) => (
              <Card key={value.name} className="text-center shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{value.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-4">Recognitions &amp; Support</h3>
          <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap">
            {['Vikas', 'V Launchpad', 'PW SoS'].map((event) => (
              <div key={event} className="flex flex-col items-center">
                <Image 
                  src="https://placehold.co/150x80.png" 
                  alt={`${event} Logo`} 
                  width={120} 
                  height={64} 
                  className="object-contain"
                  data-ai-hint="logo award"
                />
                <p className="text-sm text-muted-foreground mt-1">{event}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-lg bg-amber-50/50">
          <CardContent className="pt-6">
            <blockquote className="text-center text-lg md:text-xl italic text-muted-foreground">
              &quot;We are not just building an app; we are cultivating a future where every small farmer in India has the tools to thrive.&quot;
              <footer className="mt-4 block text-sm font-medium text-primary">- Premchand Yadav, Founder &amp; CEO</footer>
            </blockquote>
          </CardContent>
        </Card>

        {/* Optional Farmer Testimonial Placeholder */}
        <div className="mt-12 text-center">
            <p className="italic text-muted-foreground">(Farmer testimonial placeholder: A success story will be featured here soon!)</p>
        </div>

      </div>
    </section>
  );
}
