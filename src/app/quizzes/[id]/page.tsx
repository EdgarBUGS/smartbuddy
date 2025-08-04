import { quizzes } from '@/lib/quizzes';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { QuizInterface } from '@/app/quizzes/[id]/QuizInterface';
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const quiz = quizzes.find((q) => q.id === params.id);
  if (!quiz) {
    return { title: 'Quiz Not Found' };
  }
  return {
    title: `${quiz.title} | Smart Buddy`,
  };
}

export default function TakeQuizPage({ params }: Props) {
  const quiz = quizzes.find((q) => q.id === params.id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <Header title={quiz.title} />
      <main className="flex-1">
        <QuizInterface quiz={quiz} />
      </main>
    </div>
  );
}

export async function generateStaticParams() {
    return quizzes.map((quiz) => ({
      id: quiz.id,
    }));
}
