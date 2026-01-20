import { Header } from './components/Header';
import { GridCards } from './components/GridCards';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <GridCards />
    </main>
  );
}
