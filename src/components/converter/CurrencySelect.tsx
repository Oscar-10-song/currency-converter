'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { CURRENCY_LIST } from '@/lib/constants/currencies';

interface CurrencySelectProps {
  value: string;
  onChange: (code: string) => void;
  label: string;
}

export function CurrencySelect({ value, onChange, label }: CurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = CURRENCY_LIST.find((c) => c.code === value);

  const filtered = CURRENCY_LIST.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (code: string) => {
      onChange(code);
      setIsOpen(false);
      setSearch('');
    },
    [onChange]
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors text-left"
      >
        {selected && (
          <>
            <span className="text-lg">{selected.flag}</span>
            <span className="font-medium text-sm text-neutral-900 dark:text-white">
              {selected.code}
            </span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 truncate flex-1">
              {selected.name}
            </span>
          </>
        )}
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-neutral-100 dark:border-neutral-800">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search currency..."
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-400"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-sm text-neutral-400">No currencies found</div>
            ) : (
              filtered.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleSelect(currency.code)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                    currency.code === value
                      ? 'bg-neutral-50 dark:bg-neutral-800 font-medium'
                      : ''
                  }`}
                >
                  <span className="text-lg">{currency.flag}</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {currency.code}
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500 truncate">
                    {currency.name}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
