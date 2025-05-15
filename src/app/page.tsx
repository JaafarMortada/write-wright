// src/app/home/page.tsx
'use client';

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import BotSelector from "@/app/components/ui/BotSelector";
import { bots } from "@/lib/data/bots";
import { socialLinks } from "@/lib/data/social";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    setIsAtTop(scrollTop === 0);
    setIsAtBottom(Math.ceil(scrollTop + clientHeight) >= scrollHeight);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-hidden text-center">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-[32px] p-8 sm:p-10 pb-2">
            <h1 className="font-bold text-3xl sm:text-4xl">
              Welcome To <span className="bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">WriteRight</span>
            </h1>
            <h2>Choose your AI writing assistant, describe what you need, and get a professional email instantly.</h2>
          </div>
          <div className={`h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-opacity duration-300 ${isAtTop ? 'opacity-0' : 'opacity-100'}`} />
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-8 sm:px-20 py-6 no-scrollbar"
          >
            <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
              {bots.map((bot) => (
                <BotSelector key={bot.id} botId={bot.id} label={bot.name} />
              ))}
            </div>
          </div>
          <div className={`h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-opacity duration-300 ${isAtBottom ? 'opacity-0' : 'opacity-100'}`} />
        </div>
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center p-6 bg-black/30 backdrop-blur-sm border-t border-gray-200/10">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white/90"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src={link.icon}
              alt={`${link.name} icon`}
              width={16}
              height={16}
            />
            {link.name}
          </a>
        ))}
      </footer>
    </div>
  );
}
