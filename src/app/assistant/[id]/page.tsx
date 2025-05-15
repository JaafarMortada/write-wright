import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { bots } from "@/lib/data/bots";
import EmailForm from '@/app/components/forms/EmailForm';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bot = bots.find((b) => b.id === id);

  if (!bot) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full max-w-2xl gap-8 animate-fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{bot?.name ?? "AI Assistant"}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {bot?.description ?? "This assistant helps you craft professional emails from casual input."}
          </p>
          <p className="text-xs text-gray-400 italic">
            Tip: <span>{bot?.tip ?? "Keep your message short and informal — the AI will do the rest."} <br/> You can also click generate and get a template that you can edit to match your needs.</span>
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <EmailForm bot={bot} />
        </Suspense>
      </main>
    </div>
  );
}
