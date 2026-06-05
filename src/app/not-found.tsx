import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl mb-4">💱</span>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
        Page not found
      </h1>
      <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-md mb-8">
        Sorry, we couldn&apos;t find that page. Try converting currencies instead.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Back to Converter
      </Link>
    </div>
  );
}
