import Link from 'next/link';

export const metadata = {
  title: 'Tashvi — Arpit Singh Ahluwalia',
  description: 'Designed and shipped Tashvi, an AI-native product, from scratch.',
};

export default function TashviPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container home">
        <div className="max-w-2xl mx-auto text-center py-16">
          <p className="work-label">CASE STUDY</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mt-3 mb-4">Tashvi</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Founding-designer work on an AI-native product I designed and shipped from
            scratch. Full case study coming soon.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://tashvi.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Visit tashvi.ai
            </a>
            <Link href="/" className="text-gray-500 underline hover:text-gray-900 transition-colors">
              Back to work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
