import Header from '@/components/Header';
import PageContent from '@/components/PageContent';

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#1e0a3c]">
      <Header />
      <main className="w-full">
        <PageContent />
      </main>
    </div>
  );
}
