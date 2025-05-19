// src/app/actions.ts
'use server';

import { cropPlanner, type CropPlannerInput, type CropPlannerOutput } from '@/ai/flows/crop-planner';
import { z } from 'zod';

const CropPlannerInputSchema = z.object({
  location: z.string().min(3, "Location must be at least 3 characters long."),
  resources: z.string().min(10, "Please describe your resources in more detail (at least 10 characters)."),
});

interface CropPlannerActionResult {
  success: boolean;
  data?: CropPlannerOutput;
  error?: string | z.ZodError<CropPlannerInput>;
}

export async function getCropSuggestions(input: CropPlannerInput): Promise<CropPlannerActionResult> {
  const validationResult = CropPlannerInputSchema.safeParse(input);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }

  try {
    const result = await cropPlanner(validationResult.data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getCropSuggestions:", error);
    // In a real app, you might want to log this error more robustly
    // and potentially distinguish between different types of errors.
    return { success: false, error: "An unexpected error occurred while fetching crop suggestions. Please try again later." };
  }
}
