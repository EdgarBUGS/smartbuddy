import Header from '@/components/Header';
import { ExplainerClient } from '@/app/explainer/ExplainerClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Topic Explainer | Smart Buddy',
};

export default function ExplainerPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="AI Topic Explainer" />
      <main className="flex-1 overflow-y-auto p-4 pt-6 md:p-8">
        <ExplainerClient />
      </main>
    </div>
  );
}
