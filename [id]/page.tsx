'use client';

import { useState, useEffect, use } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Spinner } from "@material-tailwind/react";
import axios from 'axios';
import bots from "@/lib/data/bots.json";

interface ForgeAIResponse {
  subject: string;
  body: string;
  success:boolean;
}

type Inputs = {
  prompt: string;
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { register, handleSubmit } = useForm<Inputs>();
  const [aiResponse, setAiResponse] = useState<ForgeAIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponseEnabled, setAiResponseEnabled] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const { id } = use(params);
  const bot = bots.find((b) => b.id === id);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const payload = {
        user_inputs: {
          assitance_3: { value: bot?.name || "" },
          prompt_5: { value: data.prompt },
          today_6: { value: new Date().toLocaleDateString() },
        }
      };
      const res = await axios.post(
        "https://api.forgeai.com/v1/apps/6824d23979cf1f4f0605100e/view/run",
        payload,
        {
          headers: {
            'X-API-KEY': "sk_OfOEmjve2PBz8r05bQLxU3rO5mHD0U7tGQkWyeMmM5I",
            'Content-Type': 'application/json',
          },
        }
      );
      setAiResponse(JSON.parse(res.data.user_outputs.Node_Name_9.value));
      console.log(res.data.user_outputs.Node_Name_9.value)
      setAiResponseEnabled(true);
    } catch (err) {
      setAiResponse({ subject: 'Error', body: 'Something went wrong. Please try again.', success: false });
      setAiResponseEnabled(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!aiResponse) return;
    const combinedText = `${aiResponse.subject}\n\n${aiResponse.body}`;
    navigator.clipboard.writeText(combinedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <textarea
            {...register("prompt")}
            className="min-h-[140px] w-full rounded-lg p-4 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="e.g. I want to take next Friday off for personal reasons..."
          />
          <button
            type="submit"
            className="self-end px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 min-w-50 focus:ring-gray-400 transition-all flex items-center justify-center"
          >
            {loading ? <Spinner onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : "Generate Email"}
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
              onClick={handleCopy}
              className="self-end px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded-md"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
