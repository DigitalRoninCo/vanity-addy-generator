// apps/web/app/page.tsx
import DRVanityGenerator from '@/components/DRVanityGenerator';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <DRVanityGenerator />
        </section>
        
        <section className="h-full">
          <ChatWindow />
        </section>
      </div>
    </main>
  );
}