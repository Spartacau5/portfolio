import Link from 'next/link';

export const metadata = {
  title: 'AI Homepage — Arpit Singh Ahluwalia',
  description: 'Reimagining the homepage around an AI-first experience.',
};

export default function AiHomepagePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container home">
        <div className="max-w-2xl mx-auto text-center py-16">
          <p className="work-label">CASE STUDY</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mt-3 mb-4">AI Homepage</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Reimagining the homepage around an AI-first experience. Full case study
            coming soon.
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
