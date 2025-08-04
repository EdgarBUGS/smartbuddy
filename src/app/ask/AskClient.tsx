'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { askAiAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  output: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Thinking...' : 'Ask Question'}
    </Button>
  );
}

export function AskClient() {
  const [state, formAction] = useActionState(askAiAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Have a Question?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Stuck on a problem or curious about a concept? Ask our AI assistant
          anything, and get a clear, concise answer.
        </p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="question"
            name="question"
            placeholder="What is the powerhouse of the cell?"
            className="flex-grow text-base"
            required
          />
          <SubmitButton />
        </div>
      </form>

      {state.output && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
                {state.output.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!state.output && !state.success && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Ready to answer!</AlertTitle>
          <AlertDescription>
            Your answer will appear here once you ask a question.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
