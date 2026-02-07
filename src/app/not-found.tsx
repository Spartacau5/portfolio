import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1
          className="text-[120px] font-bold leading-none tracking-tight"
          style={{ fontFamily: 'Graphik, sans-serif', color: '#d1d5db' }}
        >
          404
        </h1>
        <p
          className="text-xl mt-2 mb-2"
          style={{ fontFamily: 'Graphik, sans-serif', fontWeight: 500, color: '#111' }}
        >
          This page doesn&apos;t exist
        </p>
        <p
          className="text-base mb-8"
          style={{ fontFamily: 'Graphik, sans-serif', fontWeight: 400, color: '#949494' }}
        >
          The page you&apos;re looking for may have been moved or no longer exists.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            fontFamily: 'Graphik, sans-serif',
            fontWeight: 500,
            background: '#000',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}
