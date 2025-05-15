'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { ForgeAIResponse, EmailFormProps } from '@/lib/utils/interfaces';
import { generateEmail } from '@/services/aiForge';
import { handleCopy } from '@/lib/utils/helpers';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function EmailForm({ bot }: EmailFormProps) {
  const { register, handleSubmit } = useForm<{
    prompt: string;
  }>();
  const [aiResponse, setAiResponse] = useState<ForgeAIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponseEnabled, setAiResponseEnabled] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const onSubmit: SubmitHandler<{prompt: string}> = async (data) => {
    try {
      setLoading(true);
      const response = await generateEmail(bot?.name || "", data.prompt);
      setAiResponse(response);
      setAiResponseEnabled(true);
    } catch (err) {
      setAiResponse({ subject: 'Error', body: 'Something went wrong. Please try again.', success: false });
      setAiResponseEnabled(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <textarea
          {...register("prompt")}
          className="min-h-[140px] w-full rounded-lg p-4 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder={bot?.placeholder ?? "e.g. I want to take next Friday off for personal reasons..."}
        />
        <button
          type="submit"
          className="self-end px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 min-w-50 focus:ring-gray-400 transition-all flex items-center justify-center"
        >
          {loading ? <LoadingSpinner /> : "Generate Email"}
        </button>
      </form>

      {aiResponseEnabled && aiResponse && (
        <div className="relative w-full max-w-3xl animate-fade-in flex flex-col gap-4">
          <input
            type="text"
            value={aiResponse.subject}
            onChange={e => setAiResponse({ ...aiResponse, subject: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white text-sm"
            placeholder="Generated Subject"
          />
          <div
            className="w-full p-4 min-h-[200px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white text-sm prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: aiResponse.body }}
          ></div>
          <button
            onClick={() => handleCopy(aiResponse, setCopied)}
            className="self-end px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded-md"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </>
  );
} 