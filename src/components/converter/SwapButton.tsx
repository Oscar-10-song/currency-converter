'use client';

import { useState } from 'react';

interface SwapButtonProps {
  onClick: () => void;
}

export function SwapButton({ onClick }: SwapButtonProps) {
  const [rotated, setRotated] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const handleClick = () => {
    setRotated(!rotated);
    setPulsing(true);
    setTimeout(() => setPulsing(false), 400);
    onClick();
  };

  return (
    <div className="flex justify-center -my-1">
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 hover:shadow-md active:scale-95 ${
          pulsing ? 'animate-pulse' : ''
        }`}
        aria-label="Swap currencies"
      >
        <svg
          className={`w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-300 ${
            rotated ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      </button>
    </div>
  );
}
