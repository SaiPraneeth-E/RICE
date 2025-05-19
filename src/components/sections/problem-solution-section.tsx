import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

const problems = [
  "86% farmers own <2 acres",
  "30% post-harvest losses",
  "No storage, no buyers, no credit",
];

const solutions = [
  "Smart Crop Planning",
  "Affordable Inputs on Credit",
  "Skill Training via WhatsApp",
  "Micro-Storage near the farm",
  "Direct B2B Market Access",
];

export default function ProblemSolutionSection() {
  return (
    <section id="problem-solution" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Challenge &amp; <span className="text-primary">Our Solution</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Small farmers in India face significant hurdles. RICE provides comprehensive solutions to empower them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Card className="shadow-lg border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-destructive">
                <XCircle className="mr-3 h-8 w-8" />
                The Hurdles Farmers Face
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-destructive mr-3 mt-1 shrink-0" />
                    <span className="text-muted-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <CheckCircle className="mr-3 h-8 w-8" />
                How RICE Helps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                    <span className="text-muted-foreground">{solution}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
