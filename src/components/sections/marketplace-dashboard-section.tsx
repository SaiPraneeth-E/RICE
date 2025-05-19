import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChartBig } from 'lucide-react';

// Placeholder data for the marketplace
const marketplaceData = [
  { id: 1, cropName: 'Tomatoes (Hybrid)', currentDemand: '5000 kg', offerPrice: '₹25/kg', location: 'Hyderabad Market' },
  { id: 2, cropName: 'Chillies (Guntur Sannam)', currentDemand: '2000 kg', offerPrice: '₹150/kg', location: 'Guntur Mandi' },
  { id: 3, cropName: 'Cotton (Long Staple)', currentDemand: '10 Tonnes', offerPrice: '₹7000/quintal', location: 'Adilabad CCI' },
  { id: 4, cropName: 'Rice (Sona Masoori)', currentDemand: '25 Tonnes', offerPrice: '₹3500/quintal', location: 'Kurnool Millers' },
  { id: 5, cropName: 'Onions (Red)', currentDemand: '8000 kg', offerPrice: '₹18/kg', location: 'Vijayawada Wholesale' },
];

export default function MarketplaceDashboardSection() {
  return (
    <section id="marketplace" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            B2B <span className="text-primary">Marketplace Insights</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time updates from our B2B marketplace, helping you sell smarter. (Demo Data)
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
                <BarChartBig className="mr-3 h-7 w-7 text-primary" />
                Current Market Opportunities
            </CardTitle>
            <CardDescription>
              This is a snapshot of current demands and offers. Connect through RICE app for live deals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-foreground">Crop Name</TableHead>
                    <TableHead className="font-semibold text-foreground">Current Demand</TableHead>
                    <TableHead className="font-semibold text-foreground">Typical Offer Price</TableHead>
                    <TableHead className="font-semibold text-foreground">Location/Buyer Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketplaceData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-foreground">{item.cropName}</TableCell>
                      <TableCell className="text-muted-foreground">{item.currentDemand}</TableCell>
                      <TableCell className="text-muted-foreground">{item.offerPrice}</TableCell>
                      <TableCell className="text-muted-foreground">{item.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
         <p className="text-center mt-8 text-sm text-muted-foreground">
          *Data shown is for illustrative purposes only. Actual market data is dynamic and available within the RICE platform.
        </p>
      </div>
    </section>
  );
}
