// src/app/actions.ts
'use server';

import { cropPlanner, type CropPlannerInput, type CropPlannerOutput } from '@/ai/flows/crop-planner';
import { z } from 'zod';

// Zod schema for server-side validation of Crop Planner inputs
const CropPlannerServerInputSchema = z.object({
  location: z.string().min(3, "Location must be at least 3 characters long."),
  resources: z.string().min(10, "Please describe your resources in more detail (at least 10 characters)."),
  landSizeAcres: z.coerce.number().optional(),
  lastSeasonCrop: z.string().optional(),
});

interface CropPlannerActionResult {
  success: boolean;
  data?: CropPlannerOutput;
  error?: string | z.ZodError<CropPlannerInput>; // ZodError type might need CropPlannerInput generic
}

export async function getCropSuggestions(input: CropPlannerInput): Promise<CropPlannerActionResult> {
  const validationResult = CropPlannerServerInputSchema.safeParse(input);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }

  try {
    // The input here is already conforming to CropPlannerInput type due to successful Zod parsing
    const result = await cropPlanner(validationResult.data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getCropSuggestions:", error);
    let errorMessage = "An unexpected error occurred while fetching crop suggestions. Please try again later.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

// Franchise ROI Calculator Action
const FranchiseRoiServerInputSchema = z.object({
  farmersServed: z.coerce.number().min(1).max(10000),
  avgRevenuePerFarmer: z.coerce.number().min(1000).max(1000000),
  commissionRate: z.coerce.number().min(1).max(50),
});
export type FranchiseRoiInput = z.infer<typeof FranchiseRoiServerInputSchema>;

interface FranchiseRoiOutput {
  estimatedAnnualEarnings: number;
}
interface FranchiseRoiActionResult {
  success: boolean;
  data?: FranchiseRoiOutput;
  error?: string | z.ZodError<FranchiseRoiInput>;
}

export async function calculateFranchiseRoiAction(input: FranchiseRoiInput): Promise<FranchiseRoiActionResult> {
  const validationResult = FranchiseRoiServerInputSchema.safeParse(input);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }
  try {
    const totalRevenue = input.farmersServed * input.avgRevenuePerFarmer;
    const estimatedAnnualEarnings = totalRevenue * (input.commissionRate / 100);
    return { success: true, data: { estimatedAnnualEarnings } };
  } catch (error) {
    console.error("Error in calculateFranchiseRoiAction:", error);
    return { success: false, error: "An unexpected error occurred while calculating ROI." };
  }
}

// Farmer Impact Calculator Action
const FarmerImpactServerInputSchema = z.object({
  currentAnnualIncome: z.coerce.number().min(1000).max(5000000),
  expectedIncreasePercentage: z.coerce.number().min(1).max(200),
  // Optional fields from the impact calculator, not used in core logic but good to have in schema if passed
  crop: z.string().optional(),
  landSize: z.coerce.number().optional(),
});
export type FarmerImpactInput = z.infer<typeof FarmerImpactServerInputSchema>;


interface FarmerImpactOutput {
  projectedAnnualIncome: number;
  additionalAnnualIncome: number;
}
interface FarmerImpactActionResult {
  success: boolean;
  data?: FarmerImpactOutput;
  error?: string | z.ZodError<FarmerImpactInput>;
}

export async function calculateFarmerImpactAction(input: FarmerImpactInput): Promise<FarmerImpactActionResult> {
  // Use a specific schema for validation if FarmerImpactInput includes fields not needed for calculation
  const calculationSchema = z.object({
    currentAnnualIncome: z.coerce.number().min(1000).max(5000000),
    expectedIncreasePercentage: z.coerce.number().min(1).max(200),
  });
  const validationResult = calculationSchema.safeParse(input);
  
  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }
  try {
    const additionalAnnualIncome = validationResult.data.currentAnnualIncome * (validationResult.data.expectedIncreasePercentage / 100);
    const projectedAnnualIncome = validationResult.data.currentAnnualIncome + additionalAnnualIncome;
    return { success: true, data: { projectedAnnualIncome, additionalAnnualIncome } };
  } catch (error) {
    console.error("Error in calculateFarmerImpactAction:", error);
    return { success: false, error: "An unexpected error occurred while calculating impact." };
  }
}
