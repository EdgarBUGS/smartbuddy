import { SidebarTrigger } from '@/components/ui/sidebar';

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:px-6 lg:px-8">
      <SidebarTrigger className="md:hidden" />
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 md:hidden" aria-hidden="true" />
      <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
        <h1 className="text-xl font-semibold leading-6 text-foreground">{title}</h1>
      </div>
    </header>
  );
}
