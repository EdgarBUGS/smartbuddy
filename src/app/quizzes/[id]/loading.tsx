import Header from '@/components/Header';
import { Skeleton } from '@/components/ui/skeleton';

export default function TakeQuizLoading() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Loading Quiz..." />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
            <Skeleton className="h-10 w-3/4" />
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
        </div>
      </main>
    </div>
  );
}
