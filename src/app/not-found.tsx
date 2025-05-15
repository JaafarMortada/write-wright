'use client';

import Link from 'next/link';
import RobotIcon from './components/ui/RobotIcon';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h2 className="text-4xl font-bold mb-4">404 - Assistant Not Found</h2>
      <div className="w-64 h-64 animate-bounce">
        <RobotIcon />
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 -mt-10">
        Sorry, the assistant you're looking for doesn't exist.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
} 