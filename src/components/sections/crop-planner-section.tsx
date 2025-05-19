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
import type { CropPlannerInput as ActionInput } from '@/ai/flows/crop-planner'; // Renaming to avoid conflict
import { Loader2, Trees } from 'lucide-react'; // Using Trees as a relevant icon

const formSchema = z.object({
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  resources: z.string().min(10, { message: "Please describe your resources (soil, water, equipment) in at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CropPlannerSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      resources: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestion(null);
    setError(null);

    const actionInput: ActionInput = {
      location: data.location,
      resources: data.resources,
    };

    const result = await getCropSuggestions(actionInput);

    if (result.success && result.data) {
      setSuggestion(result.data.suggestedCrops);
    } else {
      if (typeof result.error === 'string') {
        setError(result.error);
      } else if (result.error) { // ZodError
        // For simplicity, just showing a generic message.
        // A more sophisticated UI could map Zod errors to specific fields.
        setError("Invalid input. Please check the form fields.");
      } else {
        setError("An unknown error occurred.");
      }
    }
    setIsLoading(false);
  };

  return (
    <section id="crop-planner" className="py-16 md:py-24 bg-amber-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            AI <span className="text-primary">Crop Planner</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized crop suggestions based on your location and resources to maximize yield and profitability.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Trees className="mr-3 h-7 w-7 text-primary" />
              Find Your Ideal Crops
            </CardTitle>
            <CardDescription>
              Enter your farm&apos;s details below, and our AI will suggest the best crops for you.
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
                          placeholder="e.g., Red soil, medium water availability, tractor, basic tools"
                          {...field}
                          className="min-h-[100px] text-base"
                        />
                      </FormControl>
                      <FormDescription>
                        Describe your soil type, water availability (low, medium, high), and available equipment.
                      </FormDescription>
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
                      Getting Suggestions...
                    </>
                  ) : (
                    'Get Crop Suggestions'
                  )}
                </Button>
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
              </CardFooter>
            </form>
          </Form>
        </Card>

        {suggestion && (
          <Card className="max-w-2xl mx-auto mt-8 shadow-lg bg-background">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Suggested Crops</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-muted-foreground">{suggestion}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
