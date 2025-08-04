import Header from '@/components/Header';
import { Skeleton } from '@/components/ui/skeleton';

export default function AskLoading() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Ask AI" />
      <main className="flex-1 p-4 pt-6 md:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-8 w-64" />
            <Skeleton className="mx-auto h-5 w-96" />
          </div>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-64 w-full" />
        </div>
      </main>
    </div>
  );
}
