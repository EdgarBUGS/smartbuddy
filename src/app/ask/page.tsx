import Header from '@/components/Header';
import { AskClient } from '@/app/ask/AskClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ask AI | Smart Buddy',
};

export default function AskPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Ask AI" />
      <main className="flex-1 overflow-y-auto p-4 pt-6 md:p-8">
        <AskClient />
      </main>
    </div>
  );
}
