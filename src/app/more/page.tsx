import Link from 'next/link';

export const metadata = {
  title: 'More — Arpit Singh Ahluwalia',
  description: 'More from Arpit — music, photography, and the things outside of work.',
};

export default function MorePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container home">
        <div className="max-w-2xl mx-auto text-center py-16">
          <p className="work-label">MORE</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mt-3 mb-4">More to come</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            A space for the things outside of work — music, photography, and side
            experiments. Coming soon.
          </p>
          <div className="mt-8">
            <Link href="/" className="text-gray-500 underline hover:text-gray-900 transition-colors">
              Back to work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
