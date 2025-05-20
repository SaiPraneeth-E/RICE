'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DollarSign, Users, TrendingUp as TrendingUpIcon, Loader2 } from 'lucide-react';
import { calculateFranchiseRoiAction, type FranchiseRoiInput } from '@/app/actions';

const formSchema = z.object({
  farmersServed: z.coerce.number().min(1, "Must serve at least 1 farmer.").max(10000, "Maximum 10,000 farmers."),
  avgRevenuePerFarmer: z.coerce.number().min(1000, "Average revenue must be at least ₹1,000.").max(1000000, "Max revenue ₹1,000,000."),
  commissionRate: z.coerce.number().min(1, "Commission rate must be at least 1%.").max(50, "Commission rate cannot exceed 50%."),
});

type FormValues = z.infer<typeof formSchema>;

interface RoiResult {
  estimatedAnnualEarnings: number;
}

export default function FranchiseROICalculatorSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [roiResult, setRoiResult] = useState<RoiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmersServed: 100,
      avgRevenuePerFarmer: 50000,
      commissionRate: 5,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRoiResult(null);
    setError(null);

    const actionInput: FranchiseRoiInput = {
      farmersServed: data.farmersServed,
      avgRevenuePerFarmer: data.avgRevenuePerFarmer,
      commissionRate: data.commissionRate,
    };

    const result = await calculateFranchiseRoiAction(actionInput);

    if (result.success && result.data) {
      setRoiResult(result.data);
    } else {
      if (typeof result.error === 'string') {
        setError(result.error);
      } else {
        setError("Invalid input. Please check the form fields.");
      }
    }
    setIsLoading(false);
  };

  return (
    <section id="franchise-roi-calculator" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Franchise <span className="text-primary">ROI Calculator</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Estimate your potential earnings as a RICE Bharat franchisee.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <DollarSign className="mr-3 h-7 w-7 text-primary" />
              Calculate Your Potential
            </CardTitle>
            <CardDescription>
              Enter your estimated operational figures to see projected annual earnings.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="farmersServed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="farmersServed" className="text-base flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground" />Number of Farmers Served</FormLabel>
                      <FormControl>
                        <Input id="farmersServed" type="number" placeholder="e.g., 100" {...field} className="text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="avgRevenuePerFarmer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="avgRevenuePerFarmer" className="text-base flex items-center"><TrendingUpIcon className="mr-2 h-4 w-4 text-muted-foreground" />Average Annual Revenue per Farmer (INR)</FormLabel>
                      <FormControl>
                        <Input id="avgRevenuePerFarmer" type="number" placeholder="e.g., 50000" {...field} className="text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="commissionRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="commissionRate" className="text-base flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />RICE Commission Rate (%)</FormLabel>
                      <FormControl>
                        <Input id="commissionRate" type="number" placeholder="e.g., 5" {...field} className="text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-4">
                <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    'Calculate ROI'
                  )}
                </Button>
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
              </CardFooter>
            </form>
          </Form>
        </Card>

        {roiResult && (
          <Card className="max-w-2xl mx-auto mt-8 shadow-lg bg-primary/10 border-primary">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Estimated Annual Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center text-foreground">
                ₹ {roiResult.estimatedAnnualEarnings.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                This is a simplified projection. Actual earnings may vary based on various market factors and operational efficiency.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
