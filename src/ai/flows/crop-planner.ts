// src/ai/flows/crop-planner.ts
'use server';
/**
 * @fileOverview AI crop suggestion flow.
 *
 * - cropPlanner - A function that suggests crops based on location and resources.
 * - CropPlannerInput - The input type for the cropPlanner function.
 * - CropPlannerOutput - The return type for the cropPlanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropPlannerInputSchema = z.object({
  location: z
    .string()
    .describe('The geographical location of the farm (e.g., city, region).'),
  resources: z
    .string()
    .describe(
      'Available resources, including soil type, water availability (low, medium, high), and available equipment.'
    ),
});
export type CropPlannerInput = z.infer<typeof CropPlannerInputSchema>;

const CropPlannerOutputSchema = z.object({
  suggestedCrops: z
    .string()
    .describe(
      'A list of suggested crops suitable for the given location and resources, along with a brief explanation for each suggestion.'
    ),
});
export type CropPlannerOutput = z.infer<typeof CropPlannerOutputSchema>;

export async function cropPlanner(input: CropPlannerInput): Promise<CropPlannerOutput> {
  return cropPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropPlannerPrompt',
  input: {schema: CropPlannerInputSchema},
  output: {schema: CropPlannerOutputSchema},
  prompt: `You are an AI crop planning assistant for small farmers in India. Based on the farmer's location and available resources, suggest the most suitable crops to maximize their yield and profitability.

Location: {{{location}}}
Resources: {{{resources}}}

Provide a list of suggested crops along with a brief explanation for each suggestion, considering the local climate, market demand, and resource constraints.
`,
});

const cropPlannerFlow = ai.defineFlow(
  {
    name: 'cropPlannerFlow',
    inputSchema: CropPlannerInputSchema,
    outputSchema: CropPlannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
