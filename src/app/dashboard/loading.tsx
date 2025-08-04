import Header from '@/components/Header';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 pt-6 md:p-8">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
          <div className="grid gap-6">
            <Skeleton className="h-[400px] rounded-lg" />
          </div>
        </div>
      </main>
    </div>
  );
}
