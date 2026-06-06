'use client';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currencySymbol: string;
  label: string;
}

export function AmountInput({
  value,
  onChange,
  currencySymbol,
  label,
}: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^(\d+\.?\d*)?$/.test(val) || val === '') {
      onChange(val);
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400 dark:text-neutral-500 font-medium">
          {currencySymbol}
        </span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder="0.00"
          className="w-full pl-8 pr-4 py-2.5 bg-white dark:bg-neutral-900 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-300 dark:placeholder-neutral-600 ring-1 ring-neutral-200 dark:ring-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition-shadow duration-200"
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  );
}
