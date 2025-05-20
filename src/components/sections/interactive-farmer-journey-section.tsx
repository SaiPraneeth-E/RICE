import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Lightbulb, Banknote, Warehouse, ShoppingCart, TrendingUp, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface JourneyStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

const journeySteps: JourneyStep[] = [
  { 
    icon: Smartphone, 
    title: "1. Onboarding", 
    description: "Farmer signs up easily via WhatsApp using their local language."
  },
  { 
    icon: Lightbulb, 
    title: "2. Crop Planning", 
    description: "AI Crop Planner suggests the best crop for their land & resources, optimizing for yield and local demand."
  },
  { 
    icon: Banknote, 
    title: "3. Input Credit", 
    description: "Quality inputs (seeds, fertilizers) delivered to the farm on flexible credit terms."
  },
  { 
    icon: Warehouse, 
    title: "4. Storage", 
    description: "Harvest is stored securely in a nearby RICE micro-warehouse, reducing post-harvest losses."
  },
  { 
    icon: ShoppingCart, 
    title: "5. Sale", 
    description: "Produce is sold to verified B2B buyers on our platform at better prices."
  },
  { 
    icon: TrendingUp, 
    title: "6. Payout", 
    description: "Payment is sent directly to the farmer, and credit is auto-repaid seamlessly."
  },
];

export default function InteractiveFarmerJourneySection() {
  return (
    <section id="interactive-journey" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The RICE <span className="text-primary">Farmer Journey</span>: Step-by-Step
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience how RICE empowers farmers at every stage, turning challenges into opportunities.
          </p>
        </div>

        <div className="relative">
          {/* Decorative line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 bg-border -translate-x-1/2 opacity-50 rounded-full"></div>
          
          <div className="space-y-10 md:space-y-0"> {/* Removed md:space-y-16 to bring cards closer if line removed */}
            {journeySteps.map((step, index) => (
              <div key={step.title} className={`md:flex items-center group ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-10 md:mb-0`}> {/* Added mb-10 for mobile, md:mb-0 for desktop */}
                <div className="md:w-[calc(50%-2rem)] p-4"> {/* Adjusted width to account for connector */}
                  <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform md:group-hover:scale-105 border-primary/20 h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <step.icon className="h-10 w-10 text-primary mr-4 shrink-0" />
                        <CardTitle className="text-2xl text-foreground">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-lg">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                 {/* Connector dot and arrow for desktop */}
                {index < journeySteps.length -1 && (
                    <div className="hidden md:flex md:w-16 justify-center relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-md z-10"></div>
                        <ArrowRight className={`h-8 w-8 text-primary/70 ${index % 2 === 0 ? '' : 'transform rotate-180'}`} />
                    </div>
                )}
                 <div className="md:w-[calc(50%-2rem)] p-4 hidden md:block"> {/* Adjusted width for the empty space */}
                  {/* This space is intentionally left blank on desktop for the zig-zag pattern */}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
