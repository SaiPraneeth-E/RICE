
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getCropSuggestions } from '@/app/actions';
import type { CropPlannerInput as ActionInput, CropPlannerOutput } from '@/ai/flows/crop-planner';
import { Loader2, Trees, Leaf, Sprout, TrendingUp, BadgeCheck, AlertTriangle, ThermometerSun, CloudRain, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  resources: z.string().min(10, { message: "Please describe your resources (soil, water, equipment) in at least 10 characters." }),
  landSizeAcres: z.coerce.number().positive({ message: "Land size must be a positive number." }).optional().or(z.literal('')),
  lastSeasonCrop: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CropPlannerSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CropPlannerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      resources: "",
      landSizeAcres: undefined,
      lastSeasonCrop: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResults(null);
    setError(null);

    const actionInput: ActionInput = {
      location: data.location,
      resources: data.resources,
      landSizeAcres: data.landSizeAcres ? Number(data.landSizeAcres) : undefined,
      lastSeasonCrop: data.lastSeasonCrop || undefined,
    };

    const result = await getCropSuggestions(actionInput);

    if (result.success && result.data) {
      setResults(result.data);
    } else {
      if (typeof result.error === 'string') {
        setError(result.error);
      } else if (result.error && 'formErrors' in result.error) { // ZodError
        setError("Invalid input. Please check the form fields for specific errors.");
        // Map Zod field errors to form errors
        result.error.issues.forEach(issue => {
          form.setError(issue.path[0] as keyof FormValues, { message: issue.message });
        });
      } else {
        setError("An unknown error occurred while fetching suggestions.");
      }
    }
    setIsLoading(false);
  };

  const getDemandIcon = (demand?: string) => {
    if (demand === "High") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (demand === "Medium") return <TrendingUp className="h-4 w-4 text-yellow-500" />;
    if (demand === "Low") return <TrendingUp className="h-4 w-4 text-red-500" />;
    return null;
  };
  
  const getSeasonalFitIcon = (fit?: string) => {
    if (fit === "Excellent") return <ThermometerSun className="h-4 w-4 text-green-500" />;
    if (fit === "Good") return <CloudRain className="h-4 w-4 text-blue-500" />;
    return <ThermometerSun className="h-4 w-4 text-orange-500" />; // Default or for Average/Poor
  };


  return (
    <section id="crop-planner" className="py-16 md:py-24 bg-amber-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Advanced AI <span className="text-primary">Crop Planner</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Get personalized crop suggestions based on your farm's location, resources, land size, and past crops. We simulate weather, market demand, and ROI to help you maximize yield and profitability.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Trees className="mr-3 h-7 w-7 text-primary" />
              Find Your Ideal Crops
            </CardTitle>
            <CardDescription>
              Enter your farm&apos;s details below for AI-powered suggestions.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="location" className="text-base">Farm Location</FormLabel>
                      <FormControl>
                        <Input id="location" placeholder="e.g., Anantapur, Andhra Pradesh" {...field} className="text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resources"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="resources" className="text-base">Available Resources</FormLabel>
                      <FormControl>
                        <Textarea
                          id="resources"
                          placeholder="e.g., Red soil, medium water availability (rain-fed), tractor, basic tools"
                          {...field}
                          className="min-h-[100px] text-base"
                        />
                      </FormControl>
                      <FormDescription>
                        Describe soil type, water availability (low, medium, high, rain-fed, irrigated), equipment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landSizeAcres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="landSizeAcres" className="text-base">Land Size (Acres - Optional)</FormLabel>
                      <FormControl>
                        <Input id="landSizeAcres" type="number" placeholder="e.g., 2.5" {...field} className="text-base" />
                      </FormControl>
                      <FormDescription>Enter if you want ROI estimates.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastSeasonCrop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="lastSeasonCrop" className="text-base">Last Season&apos;s Crop (Optional)</FormLabel>
                      <FormControl>
                        <Input id="lastSeasonCrop" placeholder="e.g., Cotton, Groundnut" {...field} className="text-base" />
                      </FormControl>
                      <FormDescription>Helps with rotation and intercropping advice.</FormDescription>
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
                      Getting Advanced Suggestions...
                    </>
                  ) : (
                    'Get Advanced Crop Suggestions'
                  )}
                </Button>
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
              </CardFooter>
            </form>
          </Form>
        </Card>

        {results && (
          <div className="max-w-3xl mx-auto mt-10 space-y-8">
            {results.suggestedCrops.map((crop, index) => (
              <Card key={index} className={`shadow-lg ${crop.isRICErecommended ? 'border-2 border-primary' : 'bg-background'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl text-primary flex items-center">
                      <Leaf className="mr-3 h-7 w-7" />
                      {crop.cropName}
                    </CardTitle>
                    {crop.isRICErecommended && (
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        <BadgeCheck className="mr-1 h-4 w-4" /> RICE Recommended
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground"><strong className="text-foreground">Reasoning:</strong> {crop.reasoning}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {crop.seasonalFit && crop.seasonalFit !== "N/A" && (
                      <div className="flex items-center">
                        {getSeasonalFitIcon(crop.seasonalFit)}
                        <span className="ml-2"><strong className="text-foreground">Seasonal Fit:</strong> {crop.seasonalFit}</span>
                      </div>
                    )}
                    {crop.demandIndicator && crop.demandIndicator !== "N/A" && (
                       <div className="flex items-center">
                        {getDemandIcon(crop.demandIndicator)}
                        <span className="ml-2"><strong className="text-foreground">Market Demand:</strong> {crop.demandIndicator}</span>
                      </div>
                    )}
                  </div>

                  {crop.estimatedProfitRangePerAcre && crop.estimatedProfitRangePerAcre !== "N/A" && form.getValues("landSizeAcres") && (
                    <Card className="bg-muted/50 p-4">
                      <CardTitle className="text-lg mb-2 flex items-center"><DollarSign className="h-5 w-5 mr-2 text-green-600"/>Financial Estimates (Per Acre)</CardTitle>
                      <div className="space-y-1 text-sm">
                        <p><strong className="text-foreground">Est. Profit Range:</strong> {crop.estimatedProfitRangePerAcre}</p>
                        <p><strong className="text-foreground">Est. Input Cost:</strong> {crop.estimatedInputCostPerAcre}</p>
                        <p><strong className="text-foreground">Est. Margin %:</strong> {crop.estimatedMarginPercentage}</p>
                      </div>
                    </Card>
                  )}
                </CardContent>
              </Card>
            ))}

            {results.intercroppingSuggestion && (
              <Card className="shadow-md bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl text-green-700 flex items-center">
                    <Sprout className="mr-2 h-6 w-6" /> Intercropping Suggestion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600">{results.intercroppingSuggestion}</p>
                </CardContent>
              </Card>
            )}

            {results.rotationAlert && (
              <Card className="shadow-md bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-xl text-yellow-700 flex items-center">
                    <AlertTriangle className="mr-2 h-6 w-6" /> Crop Rotation Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-600">{results.rotationAlert}</p>
                </CardContent>
              </Card>
            )}
             <p className="text-center text-xs text-muted-foreground pt-4">
              Disclaimer: These are AI-generated suggestions and estimates. Always consult local agricultural experts before making farming decisions. Weather and market conditions can vary.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
