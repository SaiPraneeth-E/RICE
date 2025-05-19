import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Leaf, Brain, GraduationCap, MessageSquare, Warehouse, PiggyBank, TrendingUp, ShoppingBag, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  benefit: string;
}

interface Category {
  name: string;
  offerings: Service[];
}

const categories: Category[] = [
  {
    name: "Farming Tools",
    offerings: [
      { icon: Wrench, title: "Inputs", benefit: "Access quality seeds, fertilizers, and more." },
      { icon: Leaf, title: "Vertical Farming Kits", benefit: "Modern solutions for higher yields in small spaces." },
      { icon: Brain, title: "AI Crop Planner", benefit: "Smart recommendations for optimal crop selection." },
    ],
  },
  {
    name: "Training",
    offerings: [
      { icon: GraduationCap, title: "WhatsApp Skill Lab", benefit: "Learn best practices via accessible WhatsApp modules." },
      { icon: MessageSquare, title: "Advisory Services", benefit: "Expert guidance for your farming queries." },
    ],
  },
  {
    name: "Infra Access",
    offerings: [
      { icon: Warehouse, title: "Micro Warehousing", benefit: "Secure, local storage to reduce post-harvest loss." },
    ],
  },
  {
    name: "Finance",
    offerings: [
      { icon: PiggyBank, title: "Input Microcredit", benefit: "Affordable credit for purchasing essential inputs." },
      { icon: TrendingUp, title: "Credit Scoring", benefit: "Build your financial profile for better loan access." },
    ],
  },
  {
    name: "Market Linkage",
    offerings: [
      { icon: ShoppingBag, title: "B2B Marketplace", benefit: "Connect directly with verified bulk buyers." },
      { icon: Users, title: "Buyer Matchmaking", benefit: "AI-powered matching for the best sale opportunities." },
    ],
  },
];

export default function ProductsServicesSection() {
  return (
    <section id="products-services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Products &amp; Services</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of tools and services to support every aspect of smallholder farming.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-2xl font-semibold text-foreground mb-6">{category.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.offerings.map((service) => (
                  <Card key={service.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <CardHeader className="flex-shrink-0">
                      <div className="flex items-center mb-3">
                        <service.icon className="h-10 w-10 text-primary mr-4" />
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">{service.benefit}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
