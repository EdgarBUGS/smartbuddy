'use server';

import { z } from 'zod';
import { topicExplainer } from '@/ai/flows/topic-explainer';
import { askAi } from '@/ai/flows/ask-ai';

type FormState = {
  message: string;
  output?: string;
  success: boolean;
};

const explainSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
});

export async function explainTopicAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = explainSchema.safeParse({
    topic: formData.get('topic'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
      success: false,
    };
  }

  try {
    const result = await topicExplainer({ topic: validatedFields.data.topic });
    return {
      message: 'Topic explained successfully.',
      output: result.simplifiedExplanation,
      success: true,
    };
  } catch (e) {
    return {
      message: 'An error occurred. Please try again.',
      success: false,
    };
  }
}

const askSchema = z.object({
  question: z.string().min(5, { message: 'Question must be at least 5 characters long.' }),
});

export async function askAiAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
    const validatedFields = askSchema.safeParse({
        question: formData.get('question'),
    });

    if (!validatedFields.success) {
        return {
            message: validatedFields.error.errors.map((e) => e.message).join(', '),
            success: false,
        };
    }

    try {
        const result = await askAi({ question: validatedFields.data.question });
        return {
            message: 'Question answered successfully.',
            output: result.answer,
            success: true,
        };
    } catch (e) {
        return {
            message: 'An error occurred. Please try again.',
            success: false,
        };
    }
}
