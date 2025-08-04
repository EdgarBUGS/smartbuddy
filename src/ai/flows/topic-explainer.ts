// Implemented the topic explainer flow that simplifies complex scientific topics using AI.

'use server';

/**
 * @fileOverview An AI agent that simplifies complex scientific topics.
 *
 * - topicExplainer - A function that handles the topic explanation process.
 * - TopicExplainerInput - The input type for the topicExplainer function.
 * - TopicExplainerOutput - The return type for the topicExplainer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TopicExplainerInputSchema = z.object({
  topic: z.string().describe('The complex scientific topic to explain.'),
});
export type TopicExplainerInput = z.infer<typeof TopicExplainerInputSchema>;

const TopicExplainerOutputSchema = z.object({
  simplifiedExplanation: z
    .string()
    .describe('A simplified explanation of the topic.'),
});
export type TopicExplainerOutput = z.infer<typeof TopicExplainerOutputSchema>;

export async function topicExplainer(input: TopicExplainerInput): Promise<TopicExplainerOutput> {
  return topicExplainerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'topicExplainerPrompt',
  input: {schema: TopicExplainerInputSchema},
  output: {schema: TopicExplainerOutputSchema},
  prompt: `You are an expert in simplifying complex scientific topics.

  Please provide a simplified explanation of the following topic:
  {{{topic}}}`,
});

const topicExplainerFlow = ai.defineFlow(
  {
    name: 'topicExplainerFlow',
    inputSchema: TopicExplainerInputSchema,
    outputSchema: TopicExplainerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
