// src/ai/flows/ask-ai.ts
'use server';
/**
 * @fileOverview A flow to answer questions using AI.
 *
 * - askAi - A function that handles the question answering process.
 * - AskAiInput - The input type for the askAi function.
 * - AskAiOutput - The return type for the askAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAiInputSchema = z.object({
  question: z.string().describe('The question to ask the AI.'),
});
export type AskAiInput = z.infer<typeof AskAiInputSchema>;

const AskAiOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AskAiOutput = z.infer<typeof AskAiOutputSchema>;

export async function askAi(input: AskAiInput): Promise<AskAiOutput> {
  return askAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAiPrompt',
  input: {schema: AskAiInputSchema},
  output: {schema: AskAiOutputSchema},
  prompt: `You are an expert in answering questions. Please answer the following question: {{{question}}}`,
});

const askAiFlow = ai.defineFlow(
  {
    name: 'askAiFlow',
    inputSchema: AskAiInputSchema,
    outputSchema: AskAiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
