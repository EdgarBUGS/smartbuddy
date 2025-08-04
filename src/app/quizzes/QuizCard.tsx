import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Quiz } from '@/types';
import { ArrowRight } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Card className="flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-xl">
      <CardHeader className="flex-grow">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">{quiz.title}</CardTitle>
            <Badge variant="secondary">{quiz.topic}</Badge>
        </div>
        <CardDescription className="pt-2">{quiz.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/quizzes/${quiz.id}`}>
            Start Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
