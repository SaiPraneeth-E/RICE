import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Lightbulb, Truck, GraduationCap, Warehouse, ShoppingCart, Banknote, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { 
    icon: Smartphone, 
    title: "Sign Up", 
    description: "Farmer signs up easily via WhatsApp.",
  },
  { 
    icon: Lightbulb, 
    title: "Crop Planning", 
    description: "AI Crop Planner suggests the best crop for their land & resources.",
  },
  { 
    icon: Truck, 
    title: "Inputs Delivered", 
    description: "Quality inputs delivered to the farm on credit.",
  },
  { 
    icon: GraduationCap, 
    title: "Skill Training", 
    description: "Farmers receive training via our WhatsApp Skill Lab.",
  },
  { 
    icon: Warehouse, 
    title: "Harvest Storage", 
    description: "Harvest is stored securely in a nearby RICE micro-warehouse.",
  },
  { 
    icon: ShoppingCart, 
    title: "Market Access", 
    description: "Produce is sold to verified buyers on our B2B platform.",
  },
  { 
    icon: Banknote, 
    title: "Payment & Repayment", 
    description: "Payment is sent directly to the farmer, and credit is auto-repaid.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-amber-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The <span className="text-primary">RICE Journey</span> for Farmers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A seamless flow designed to support farmers at every step, from planning to profit.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-5/12">
                  <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} md:max-w-md`}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl text-primary">
                        <step.icon className="mr-3 h-7 w-7" />
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                {/* Dot on the line */}
                <div className="hidden md:flex md:w-2/12 justify-center">
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-md"></div>
                  </div>
                </div>
                 {/* Spacer for alignment - hidden content */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="#" className="inline-flex items-center text-primary hover:underline">
            See an example: Ravi&apos;s tomato journey <LinkIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
