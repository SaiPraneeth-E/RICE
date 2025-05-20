
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, CheckCircle } from 'lucide-react';

// Custom SVG icons as Lucide doesn't have specific ones for core values, retaining these.
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

const coreValues = [
  { icon: UsersIcon, name: "Inclusion", description: "Empowering every farmer, irrespective of scale." },
  { icon: LightbulbIcon, name: "Innovation", description: "Leveraging technology for agricultural advancement." },
  { icon: ShieldCheckIcon, name: "Integrity", description: "Transparent and ethical practices in all dealings." },
];

const recognitions = [
  { title: "Finalist – Vikas Startup Accelerator", description: "(Among Top 10 from 300+ Agri & Social Impact startups)" },
  { title: "Finalist – V Launchpad Innovation Challenge", description: "(Shortlisted for top ideation-stage ventures)" },
  { title: "Selected – E-Summit 2024, IIT Hyderabad", description: "(Recognized as a promising student-led AgriTech startup)" },
  { title: "Shortlisted – Wadhwani Foundation Ignite 3.4", description: "(Handpicked for their early-stage venture support program)" },
  { title: "Top 20 – PW School of Startups 2025 (PhysicsWallah Innovation Centre)", description: "(Selected from many entries nationwide)" },
];

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
        
        <div className="mb-12 py-12 bg-muted/30 rounded-lg shadow-inner">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-4">🏆 Recognitions &amp; Support</h3>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto px-4">
            RICE has been recognized by leading startup platforms, educational institutions, and innovation ecosystems across India:
          </p>
          <div className="max-w-2xl mx-auto px-4">
            <ul className="space-y-6">
              {recognitions.map((recognition, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-background rounded-md shadow-sm border border-border">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">{recognition.title}</h4>
                    <p className="text-sm text-muted-foreground">{recognition.description}</p>
                  </div>
                </li>
              ))}
            </ul>
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

