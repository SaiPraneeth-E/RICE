import HeroSection from '@/components/sections/hero-section';
import ProblemSolutionSection from '@/components/sections/problem-solution-section';
import InteractiveFarmerJourneySection from '@/components/sections/interactive-farmer-journey-section';
import ProductsServicesSection from '@/components/sections/products-services-section';
import FranchiseesSection from '@/components/sections/franchisees-section';
import ImpactVisionSection from '@/components/sections/impact-vision-section';
import TeamSection from '@/components/sections/team-section';
import CropPlannerSection from '@/components/sections/crop-planner-section';
import MarketplaceDashboardSection from '@/components/sections/marketplace-dashboard-section';
import FranchiseROICalculatorSection from '@/components/sections/franchise-roi-calculator-section';
import FarmerImpactCalculatorSection from '@/components/sections/farmer-impact-calculator-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <InteractiveFarmerJourneySection />
      <ProductsServicesSection />
      <MarketplaceDashboardSection />
      <CropPlannerSection />
      <FranchiseROICalculatorSection />
      <FarmerImpactCalculatorSection />
      <FranchiseesSection />
      <ImpactVisionSection />
      <TeamSection />
      <div id="waitlist" className="hidden"></div>
      <div id="contact" className="py-12 bg-background">
        <div className="container text-center">
            <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground mt-2">Reach out to us via the contact details in the footer.</p>
        </div>
      </div>
    </>
  );
}
