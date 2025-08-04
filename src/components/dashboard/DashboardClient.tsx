'use client';

import { useQuizHistory } from '@/hooks/use-quiz-history';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { FileQuestion, Target, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function DashboardClient() {
  const { history, isLoaded } = useQuizHistory();

  if (!isLoaded) {
    return null; // Or a loading skeleton, but the route's loading.tsx handles the initial view
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-card p-12 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">No quizzes taken yet</h3>
        <p className="mb-6 mt-2 text-sm text-muted-foreground">
          Start a quiz to see your progress here.
        </p>
        <Button asChild>
          <Link href="/quizzes">Take a Quiz</Link>
        </Button>
      </div>
    );
  }

  const totalQuizzes = history.length;
  const totalScore = history.reduce((acc, curr) => acc + curr.score, 0);
  const totalQuestions = history.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const averageScore = totalQuizzes > 0 ? (totalScore / totalQuestions) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Quizzes Taken"
          value={totalQuizzes.toString()}
          icon={FileQuestion}
          description="Total number of quizzes you have completed."
        />
        <StatsCard
          title="Average Score"
          value={`${averageScore.toFixed(0)}%`}
          icon={Target}
          description="Your average score across all quizzes."
        />
        <StatsCard
          title="Top Score"
          value={`${Math.max(...history.map((h) => (h.score / h.totalQuestions) * 100)).toFixed(0)}%`}
          icon={Trophy}
          description="Your highest score on a single quiz."
        />
      </div>
      <div>
        <ProgressChart history={history} />
      </div>
    </div>
  );
}
