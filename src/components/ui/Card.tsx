interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className = '', padding = 'md', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl shadow-sm shadow-neutral-200/50 dark:shadow-neutral-900/50 ${
        hover ? 'hover:shadow-md hover:shadow-neutral-200/70 dark:hover:shadow-neutral-900/70 transition-shadow duration-200' : ''
      } ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
