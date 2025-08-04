import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AppSidebar } from '@/components/AppSidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Buddy',
  description: 'An AI-powered learning assistant to help you master any topic.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AppSidebar>{children}</AppSidebar>
        <Toaster />
      </body>
    </html>
  );
}
