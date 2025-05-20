import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Lightbulb, Banknote, Warehouse, ShoppingCart, TrendingUp, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface JourneyStep {
  icon: LucideIcon;
  title: string;
  description: string;
  animationHint?: string; // For future animation implementation
}

const journeySteps: JourneyStep[] = [
  { 
    icon: Smartphone, 
    title: "1. Onboarding", 
    description: "Farmer signs up easily via WhatsApp using their local language.",
    animationHint: "Icon slides in, text fades up."
  },
  { 
    icon: Lightbulb, 
    title: "2. Crop Planning", 
    description: "AI Crop Planner suggests the best crop for their land & resources, optimizing for yield and local demand.",
    animationHint: "Lightbulb brightens, suggestion text appears."
  },
  { 
    icon: Banknote, 
    title: "3. Input Credit", 
    description: "Quality inputs (seeds, fertilizers) delivered to the farm on flexible credit terms.",
    animationHint: "Coins animate, truck icon delivers package."
  },
  // Placeholder for skill training if needed, or merge with another step
  // { 
  //   icon: GraduationCap, 
  //   title: "Skill Training", 
  //   description: "Farmers receive training via our WhatsApp Skill Lab.",
  // },
  { 
    icon: Warehouse, 
    title: "4. Storage", 
    description: "Harvest is stored securely in a nearby RICE micro-warehouse, reducing post-harvest losses.",
    animationHint: "Warehouse fills up, loss percentage decreases."
  },
  { 
    icon: ShoppingCart, 
    title: "5. Sale", 
    description: "Produce is sold to verified B2B buyers on our platform at better prices.",
    animationHint: "Graph shows price increase, deal handshake animation."
  },
  { 
    icon: TrendingUp, 
    title: "6. Payout", 
    description: "Payment is sent directly to the farmer, and credit is auto-repaid seamlessly.",
    animationHint: "Money transfers to farmer, credit balance updates."
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
            (Scroll-based animations to be added to enhance visualization).
          </p>
        </div>

        <div className="relative">
          {/* Decorative line for desktop, could be animated */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 bg-border -translate-x-1/2 opacity-50 rounded-full"></div>
          
          <div className="space-y-10 md:space-y-16">
            {journeySteps.map((step, index) => (
              <div key={step.title} className={`md:flex items-center group ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2 p-4">
                  <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform md:group-hover:scale-105 border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <step.icon className="h-10 w-10 text-primary mr-4 shrink-0" />
                        <CardTitle className="text-2xl text-foreground">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-lg">{step.description}</p>
                      {step.animationHint && <p className="text-xs text-muted-foreground/70 mt-2 italic">(Animation: {step.animationHint})</p>}
                    </CardContent>
                  </Card>
                </div>
                 {/* Connector dot for desktop */}
                <div className="hidden md:flex md:w-auto justify-center relative px-8">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-md z-10"></div>
                  <ArrowRight className={`h-8 w-8 text-primary/70 ${index % 2 === 0 ? '' : 'transform rotate-180'}`} />
                </div>
                <div className="md:w-1/2 p-4">
                  {/* Placeholder for an image or further visual element for each step */}
                   <div className="aspect-video bg-muted rounded-lg flex items-center justify-center p-4 border border-dashed">
                     <p className="text-muted-foreground italic">Visual/Animation for {step.title}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
