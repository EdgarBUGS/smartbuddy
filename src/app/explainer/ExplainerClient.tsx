'use client';

import { useActionState, useFormStatus } from 'react';
import { useEffect, useRef } from 'react';
import { explainTopicAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  output: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Explaining...' : 'Explain Topic'}
    </Button>
  );
}

export function ExplainerClient() {
  const [state, formAction] = useActionState(explainTopicAction, initialState);
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
          Simplify Complexity
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter any scientific topic, and our AI will break it down into an
          easy-to-understand explanation for you.
        </p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <Textarea
            id="topic"
            name="topic"
            placeholder="e.g., Quantum Entanglement, Black Holes, CRISPR gene editing..."
            className="min-h-[100px] text-base"
            required
          />
        </div>
        <SubmitButton />
      </form>

      {state.output && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Simplified Explanation</CardTitle>
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
            <Terminal className="h-4 w-4" />
            <AlertTitle>Waiting for a topic!</AlertTitle>
            <AlertDescription>
                Your explanation will appear here once you submit a topic.
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
