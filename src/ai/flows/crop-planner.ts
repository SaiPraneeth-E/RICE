// src/ai/flows/crop-planner.ts
'use server';
/**
 * @fileOverview AI crop suggestion flow.
 *
 * - cropPlanner - A function that suggests crops based on location, resources, land size, and last season's crop.
 * - CropPlannerInput - The input type for the cropPlanner function.
 * - CropPlannerOutput - The return type for the cropPlanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropPlannerInputSchema = z.object({
  location: z
    .string()
    .describe('The geographical location of the farm (e.g., district, state, specific area if known).'),
  resources: z
    .string()
    .describe(
      'Available resources, including soil type (e.g., red, black, alluvial), water availability (low, medium, high, rain-fed, irrigated), and available equipment (e.g., tractor, tiller, manual tools).'
    ),
  landSizeAcres: z.coerce.number().optional().describe('The size of the land in acres available for planning.'),
  lastSeasonCrop: z.string().optional().describe('The crop grown in the last season on this land, if any.'),
});
export type CropPlannerInput = z.infer<typeof CropPlannerInputSchema>;

const SuggestedCropSchema = z.object({
  cropName: z.string().describe('The name of the suggested crop.'),
  reasoning: z.string().describe('Detailed explanation why this crop is suggested, considering all inputs.'),
  isRICErecommended: z.boolean().optional().describe('A badge indicating if this is a "RICE Recommended" crop based on high demand, good margin, and climate/soil fit.'),
  estimatedProfitRangePerAcre: z.string().optional().describe('Estimated profit range per acre (e.g., "₹10,000 - ₹15,000"). Output N/A if landSizeAcres is not provided.'),
  estimatedInputCostPerAcre: z.string().optional().describe('Estimated input cost per acre (e.g., "₹3,000 - ₹4,000"). Output N/A if landSizeAcres is not provided.'),
  estimatedMarginPercentage: z.string().optional().describe('Estimated profit margin percentage (e.g., "50% - 60%"). Output N/A if landSizeAcres is not provided.'),
  demandIndicator: z.enum(["High", "Medium", "Low", "N/A"]).optional().describe('Indicates current market demand (High, Medium, Low). Simulate based on typical Indian market trends if real-time data is unavailable.'),
  seasonalFit: z.enum(["Excellent", "Good", "Average", "Poor", "N/A"]).optional().describe('How well the crop fits the upcoming 90-day season in the_district, considering typical rainfall and temperature patterns. Simulate based on general agronomic knowledge for the region.'),
});

const CropPlannerOutputSchema = z.object({
  suggestedCrops: z.array(SuggestedCropSchema).min(1).max(3).describe('A list of 1 to 3 suggested crops suitable for the given location and resources, along with detailed information for each.'),
  intercroppingSuggestion: z.string().optional().describe('If applicable, a suggestion for intercropping based on the primary suggested crop, last season\'s crop, and soil type. Explain the benefits.'),
  rotationAlert: z.string().optional().describe('If applicable, an alert or suggestion for crop rotation to avoid monoculture or pest buildup, based on the last season\'s crop and primary suggestions.'),
});
export type CropPlannerOutput = z.infer<typeof CropPlannerOutputSchema>;

export async function cropPlanner(input: CropPlannerInput): Promise<CropPlannerOutput> {
  return cropPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropPlannerPrompt',
  input: {schema: CropPlannerInputSchema},
  output: {schema: CropPlannerOutputSchema},
  prompt: `You are an expert AI Agronomist for small farmers in India. Your goal is to provide comprehensive and actionable crop plans.

Farmer's Details:
- Location: {{{location}}}
- Resources: {{{resources}}}
{{#if landSizeAcres~}}
- Land Size: {{{landSizeAcres}}} acres
{{/if~}}
{{#if lastSeasonCrop~}}
- Last Season's Crop: {{{lastSeasonCrop}}}
{{/if~}}

Task:
1.  Suggest 1 to 3 primary crops. For each crop:
    *   **Crop Name**: Identify the crop.
    *   **Reasoning**: Explain in detail why this crop is suitable, considering the farmer's location (climate, soil implications), resources (water, equipment), land size, and market viability.
    *   **Seasonal Fit**: Based on the ({{{location}}}) district's typical weather patterns for the next 90 days (simulated rainfall and temperature), rate the seasonal fit as Excellent, Good, Average, or Poor. Explain briefly.
    *   **Demand Indicator**: Simulate and indicate current market demand (High, Medium, Low) for this crop in regional Indian markets.
    *   **RICE Recommended Badge**: If a crop has high demand, good margin potential, AND good seasonal/soil fit, mark \`isRICErecommended\` as true. Otherwise, false or omit.
    *   **Financial Estimates (Per Acre)**: If landSizeAcres is provided, estimate:
        *   \`estimatedProfitRangePerAcre\` (e.g., "₹10,000 - ₹15,000")
        *   \`estimatedInputCostPerAcre\` (e.g., "₹3,000 - ₹4,000")
        *   \`estimatedMarginPercentage\` (e.g., "Profit / Revenue * 100")
        If landSizeAcres is not provided, set these financial fields to "N/A". Base estimates on typical Indian agricultural conditions and provide a realistic range.

2.  **Intercropping Suggestion**: If relevant (based on primary suggestions, soil type implied from resources, and {{{lastSeasonCrop}}}), suggest a beneficial intercrop. Explain its benefits (e.g., soil health, pest control, extra income).

3.  **Rotation Alert**: If {{{lastSeasonCrop}}} is provided and a primary suggested crop might lead to issues (e.g., nutrient depletion, pest cycle), provide a crop rotation alert or suggestion.

Output Format:
Strictly follow the JSON schema for CropPlannerOutput. Ensure all fields are populated as described.
Provide practical and actionable advice.
Prioritize crops known to perform well in the specified Indian agro-climatic zones.
If the location is vague, make reasonable assumptions for a common agricultural district in India.
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
    if (!output) {
      throw new Error("The AI failed to generate crop suggestions. Please try again.");
    }
    // Ensure at least one crop is suggested if the AI returns an empty array (should be handled by schema min(1) but as a fallback)
    if (output.suggestedCrops.length === 0) {
        return {
            suggestedCrops: [{
                cropName: "Millet (Generic)",
                reasoning: "As a general fallback, millets are often resilient and suitable for varied Indian conditions. Please provide more specific details for a tailored recommendation.",
                demandIndicator: "Medium",
                seasonalFit: "Good",
            }],
            intercroppingSuggestion: "Consider intercropping with pulses to improve soil fertility.",
            rotationAlert: "Ensure crop rotation to maintain soil health."
        };
    }
    return output;
  }
);
