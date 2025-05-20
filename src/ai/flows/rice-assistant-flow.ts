'use server';
/**
 * @fileOverview A RICE Bharat AI assistant flow.
 *
 * - riceAssistant - A function that handles chat interactions with the AI assistant.
 * - RiceAssistantInput - The input type for the riceAssistant function.
 * - RiceAssistantOutput - The return type for the riceAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatHistoryEntrySchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.array(z.object({
    text: z.string().optional(),
  }))
});

const RiceAssistantInputSchema = z.object({
  userInput: z.string().describe('The user\'s message to the AI assistant.'),
  chatHistory: z.array(ChatHistoryEntrySchema).optional().describe('The history of the conversation so far.'),
});
export type RiceAssistantInput = z.infer<typeof RiceAssistantInputSchema>;

const RiceAssistantOutputSchema = z.object({
  botResponse: z.string().describe('The AI assistant\'s response to the user.'),
});
export type RiceAssistantOutput = z.infer<typeof RiceAssistantOutputSchema>;

export async function riceAssistant(input: RiceAssistantInput): Promise<RiceAssistantOutput> {
  return riceAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riceAssistantPrompt',
  input: { schema: RiceAssistantInputSchema },
  output: { schema: RiceAssistantOutputSchema },
  system: `You are RICE Mitra, a friendly and knowledgeable AI assistant from RICE Bharat.
Your goal is to help Indian farmers with their queries about agriculture, RICE Bharat's services, crop planning, market prices, and government schemes.
Always use simple, clear language. Be patient and empathetic.
If you don't know the answer, politely say so. Do not make up information.
Keep your answers concise and to the point. Try to use bullet points or numbered lists if it makes the information clearer.
RICE Bharat provides services like AI Crop Planner, Input Credit, Micro-Warehousing, B2B Marketplace, and Skill Training via WhatsApp.
You can provide general farming advice, explain RICE services, or discuss market trends (simulated).`,
  prompt: (input: RiceAssistantInput) => {
    const history = input.chatHistory?.map(entry => ({
      role: entry.role,
      parts: entry.parts.map(part => ({ text: part.text || "" }))
    })) || [];

    const messages = [
      ...history,
      { role: 'user' as const, parts: [{ text: input.userInput }] }
    ];
    return messages;
  }
});

const riceAssistantFlow = ai.defineFlow(
  {
    name: 'riceAssistantFlow',
    inputSchema: RiceAssistantInputSchema,
    outputSchema: RiceAssistantOutputSchema,
  },
  async (input: RiceAssistantInput) => {
    const { output } = await prompt(input);
    if (!output || !output.botResponse) {
      return { botResponse: "I'm sorry, I couldn't process that. Could you please try rephrasing?" };
    }
    return { botResponse: output.botResponse };
  }
);
