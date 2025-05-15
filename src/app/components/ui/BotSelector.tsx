"use client";

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BotSelectorProps } from '@/lib/utils/interfaces';

const BotSelector: React.FC<BotSelectorProps> = ({ botId, icon, label }) => {
  return (
    <Link
      href={`/assistant/${botId}`}
      className="flex flex-row p-4 
      rounded-lg border border-blue-gray-50 hover:border-teal-500 hover:-translate-y-0.5 transition-all cursor-pointer w-full"
    >
        {icon?? icon}
      <div className="p-0 flex justify-between w-full">
        <p className="">{label}</p>
        <FontAwesomeIcon icon={faArrowRight} className="text-white text-xl" />
        </div>
    </Link>  );
};

export default BotSelector;