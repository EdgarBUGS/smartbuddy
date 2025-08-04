import Header from '@/components/Header';
import { Skeleton } from '@/components/ui/skeleton';

export default function QuizzesLoading() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Practice Quizzes" />
      <main className="flex-1 p-4 pt-6 md:p-8">
        <div className="mb-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-2 h-5 w-80" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </main>
    </div>
  );
}
