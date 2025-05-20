
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TrendingUp, ArrowRightLeft, Loader2, Leaf, DollarSign as DollarSignIcon } from 'lucide-react'; // Renamed DollarSign to avoid conflict
import { calculateFarmerImpactAction, type FarmerImpactInput } from '@/app/actions';

const formSchema = z.object({
  currentAnnualIncome: z.coerce.number().min(1000, "Income must be at least ₹1,000.").max(5000000, "Max income ₹5,000,000."),
  crop: z.string().min(3, "Crop name must be at least 3 characters.").optional(),
  landSize: z.coerce.number().min(0.1, "Land size must be at least 0.1 acres.").max(100, "Max 100 acres.").optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ImpactResult {
  projectedAnnualIncome: number;
  additionalAnnualIncome: number;
}

const FIXED_INCREASE_PERCENTAGE = 35; // Average of 30-40%

export default function FarmerImpactCalculatorSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [impactResult, setImpactResult] = useState<ImpactResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAnnualIncome: 50000,
      crop: "Tomatoes",
      landSize: 1,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setImpactResult(null);
    setError(null);

    const actionInput: FarmerImpactInput = {
      currentAnnualIncome: data.currentAnnualIncome,
      expectedIncreasePercentage: FIXED_INCREASE_PERCENTAGE, // Use fixed percentage
      crop: data.crop,
      landSize: data.landSize,
    };

    const result = await calculateFarmerImpactAction(actionInput);

    if (result.success && result.data) {
      setImpactResult(result.data);
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
    <section id="farmer-impact-calculator" className="py-16 md:py-24 bg-amber-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What If You Had <span className="text-primary">RICE?</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See how RICE can potentially increase your farm income. We estimate a typical income increase of 30-40% for farmers partnering with RICE.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUp className="mr-3 h-7 w-7 text-primary" />
              Calculate Your Income Impact
            </CardTitle>
            <CardDescription>
              Enter your current farm details to see your projected earnings with RICE.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="crop" className="text-base flex items-center"><Leaf className="mr-2 h-4 w-4 text-muted-foreground" />Primary Crop (Optional)</FormLabel>
                      <FormControl>
                        <Input id="crop" placeholder="e.g., Tomatoes, Cotton" {...field} className="text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="landSize" className="text-base flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground"><path d="M21 3H3v18h18V3zM9 3v18M15 3v18M3 9h18M3 15h18"/></svg>Land Size (Acres - Optional)</FormLabel>
                      <FormControl>
                        <Input id="landSize" type="number" placeholder="e.g., 2.5" {...field} className="text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentAnnualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="currentAnnualIncome" className="text-base flex items-center"><DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground" />Current Annual Farm Income (INR)</FormLabel>
                      <FormControl>
                        <Input id="currentAnnualIncome" type="number" placeholder="e.g., 50000" {...field} className="text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Expected Increase Percentage input field removed */}
                 <FormDescription className="text-sm text-muted-foreground">
                    Our platform typically helps farmers increase their income by 30-40%. This calculator uses an average of {FIXED_INCREASE_PERCENTAGE}% for projection.
                </FormDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-4">
                <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Calculating Impact...
                    </>
                  ) : (
                    'Calculate Impact'
                  )}
                </Button>
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
              </CardFooter>
            </form>
          </Form>
        </Card>

        {impactResult && (
          <Card className="max-w-2xl mx-auto mt-8 shadow-lg bg-background border-primary/30">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <ArrowRightLeft className="mr-3 h-6 w-6" />
                Your Potential Growth with RICE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Annual Income (Simulated)</p>
                <p className="text-2xl font-semibold text-muted-foreground/80">₹ {form.getValues("currentAnnualIncome").toLocaleString('en-IN')}</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-primary">Projected Annual Income with RICE (Est. {FIXED_INCREASE_PERCENTAGE}% increase)</p>
                <p className="text-3xl font-bold text-primary">₹ {impactResult.projectedAnnualIncome.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-accent">Additional Annual Income</p>
                <p className="text-2xl font-semibold text-accent">+ ₹ {impactResult.additionalAnnualIncome.toLocaleString('en-IN')}</p>
              </div>
              <p className="text-xs text-muted-foreground text-center pt-2">
                This is a simplified projection based on your inputs and a typical income increase of 30-40% observed with RICE Bharat services. Actual results can vary due to market conditions, crop choices, and other factors.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

