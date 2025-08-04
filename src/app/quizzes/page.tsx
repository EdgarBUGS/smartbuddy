import Header from '@/components/Header';
import { quizzes } from '@/lib/quizzes';
import { QuizCard } from '@/app/quizzes/QuizCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quizzes | Smart Buddy',
};

export default function QuizzesPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Practice Quizzes" />
      <main className="flex-1 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Available Topics</h2>
            <p className="text-muted-foreground">Choose a quiz to test your knowledge.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </main>
    </div>
  );
}
