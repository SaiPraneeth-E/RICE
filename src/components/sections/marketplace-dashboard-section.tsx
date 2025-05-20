// src/components/sections/marketplace-dashboard-section.tsx
'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, TrendingUp } from 'lucide-react'; // Using BarChart from lucide as BarChartBig is not standard
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useState, useEffect } from 'react';

// Placeholder data for the marketplace
const initialMarketplaceData = [
  { id: 1, cropName: 'Tomatoes (Hybrid)', currentDemand: '5000 kg', offerPrice: '₹25/kg', location: 'Hyderabad Market', district: 'Hyderabad' },
  { id: 2, cropName: 'Chillies (Guntur Sannam)', currentDemand: '2000 kg', offerPrice: '₹150/kg', location: 'Guntur Mandi', district: 'Guntur' },
  { id: 3, cropName: 'Cotton (Long Staple)', currentDemand: '10 Tonnes', offerPrice: '₹7000/quintal', location: 'Adilabad CCI', district: 'Adilabad' },
  { id: 4, cropName: 'Rice (Sona Masoori)', currentDemand: '25 Tonnes', offerPrice: '₹3500/quintal', location: 'Kurnool Millers', district: 'Kurnool' },
  { id: 5, cropName: 'Onions (Red)', currentDemand: '8000 kg', offerPrice: '₹18/kg', location: 'Vijayawada Wholesale', district: 'Krishna' },
  { id: 6, cropName: 'Mangoes (Banganapalli)', currentDemand: '15 Tonnes', offerPrice: '₹50/kg', location: 'Chittoor Market', district: 'Chittoor' },
];

const cropPriceChartData = [
  { month: "Jan", tomatoes: 20, chillies: 140, cotton: 6800 },
  { month: "Feb", tomatoes: 22, chillies: 145, cotton: 6900 },
  { month: "Mar", tomatoes: 25, chillies: 150, cotton: 7000 },
  { month: "Apr", tomatoes: 23, chillies: 155, cotton: 7100 },
  { month: "May", tomatoes: 26, chillies: 160, cotton: 7050 },
  { month: "Jun", tomatoes: 24, chillies: 150, cotton: 6950 },
];

const chartConfig = {
  tomatoes: { label: "Tomatoes (₹/kg)", color: "hsl(var(--chart-1))" },
  chillies: { label: "Chillies (₹/kg)", color: "hsl(var(--chart-2))" },
  cotton: { label: "Cotton (₹/quintal)", color: "hsl(var(--chart-3))" , yAxisId: "right" },
} satisfies ChartConfig;


const crops = ["All", "Tomatoes (Hybrid)", "Chillies (Guntur Sannam)", "Cotton (Long Staple)", "Rice (Sona Masoori)", "Onions (Red)", "Mangoes (Banganapalli)"];
const districts = ["All", "Hyderabad", "Guntur", "Adilabad", "Kurnool", "Krishna", "Chittoor"];

export default function MarketplaceDashboardSection() {
  const [filteredData, setFilteredData] = useState(initialMarketplaceData);
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let data = initialMarketplaceData;
    if (selectedCrop !== "All") {
      data = data.filter(item => item.cropName === selectedCrop);
    }
    if (selectedDistrict !== "All") {
      data = data.filter(item => item.district === selectedDistrict);
    }
    setFilteredData(data);
  }, [selectedCrop, selectedDistrict]);

  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <section id="marketplace" className="py-16 md:py-24 bg-amber-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Live <span className="text-primary">Market Insights</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time (simulated) mandi prices and demand trends from Andhra Pradesh & Telangana.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div>
            <label htmlFor="crop-filter" className="block text-sm font-medium text-muted-foreground mb-1">Filter by Crop</label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger id="crop-filter" className="w-full">
                <SelectValue placeholder="Select Crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map(crop => <SelectItem key={crop} value={crop}>{crop}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="district-filter" className="block text-sm font-medium text-muted-foreground mb-1">Filter by District</label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger id="district-filter" className="w-full">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map(district => <SelectItem key={district} value={district}>{district}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
           <div>
            <label htmlFor="demand-filter" className="block text-sm font-medium text-muted-foreground mb-1">Buyer Demand Trends</label>
            <Select disabled>
              <SelectTrigger id="demand-filter" className="w-full">
                <SelectValue placeholder="e.g., High Volume Buyers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-volume">High Volume Buyers</SelectItem>
                <SelectItem value="organic-focus">Organic Focus</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Further trend filters coming soon.</p>
          </div>
        </div>

        <Card className="shadow-xl mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
                <TrendingUp className="mr-3 h-7 w-7 text-primary" />
                Current Market Opportunities
            </CardTitle>
            <CardDescription>
              Snapshot of current demands and offers. Connect through RICE app for live deals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-foreground">Crop Name</TableHead>
                    <TableHead className="font-semibold text-foreground">District</TableHead>
                    <TableHead className="font-semibold text-foreground">Current Demand</TableHead>
                    <TableHead className="font-semibold text-foreground">Typical Offer Price</TableHead>
                    <TableHead className="font-semibold text-foreground">Location/Buyer Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-primary">{item.cropName}</TableCell>
                      <TableCell className="text-muted-foreground">{item.district}</TableCell>
                      <TableCell className="text-muted-foreground">{item.currentDemand}</TableCell>
                      <TableCell className="text-muted-foreground">{item.offerPrice}</TableCell>
                      <TableCell className="text-muted-foreground">{item.location}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No data matches your filters.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                    <BarChart className="mr-3 h-7 w-7 text-primary" />
                    Crop Price Trends (Simulated)
                </CardTitle>
                <CardDescription>Monthly average prices for selected crops in key mandis.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsPrimitive.BarChart data={cropPriceChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar yAxisId="left" dataKey="tomatoes" fill="var(--color-tomatoes)" radius={4} />
                        <Bar yAxisId="left" dataKey="chillies" fill="var(--color-chillies)" radius={4} />
                        <Bar yAxisId="right" dataKey="cotton" fill="var(--color-cotton)" radius={4} />
                        </RechartsPrimitive.BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>

         <p className="text-center mt-8 text-sm text-muted-foreground">
          *Data shown is for illustrative/simulated purposes only. Actual market data is dynamic and available within the RICE platform.
        </p>
      </div>
    </section>
  );
}

// Re-import RechartsPrimitive as it's used inside ChartContainer
import * as RechartsPrimitive from "recharts"
