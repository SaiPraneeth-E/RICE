import HeroSection from '@/components/sections/hero-section';
import ProblemSolutionSection from '@/components/sections/problem-solution-section';
import HowItWorksSection from '@/components/sections/how-it-works-section';
import ProductsServicesSection from '@/components/sections/products-services-section';
import FranchiseesSection from '@/components/sections/franchisees-section';
import ImpactVisionSection from '@/components/sections/impact-vision-section';
import TeamSection from '@/components/sections/team-section';
import CropPlannerSection from '@/components/sections/crop-planner-section';
import MarketplaceDashboardSection from '@/components/sections/marketplace-dashboard-section';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <HowItWorksSection />
      <ProductsServicesSection />
      <MarketplaceDashboardSection />
      <CropPlannerSection />
      <FranchiseesSection />
      <ImpactVisionSection />
      <TeamSection />
      {/* An invisible section for the waitlist link in hero, if needed. Or it can be part of contact */}
      <div id="waitlist" className="hidden"></div>
      {/* Contact section elements will be in Footer, but can add a dedicated section if needed */}
      <div id="contact" className="py-12 bg-background">
        <div className="container text-center">
            <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground mt-2">Reach out to us via the contact details in the footer.</p>
        </div>
      </div>
    </>
  );
}
