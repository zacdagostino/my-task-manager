// src/app/page.tsx
import Head from 'next/head';
import KanbanBoard from './components/KanbanBoard';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kanban Task Manager</title>
        <meta name="description" content="Manage your tasks with a Kanban board." />
      </Head>
      
      {/* Render the Kanban board component here */}
      <main className="p-6 bg-gray-100 min-h-screen">
        <KanbanBoard />
      </main>
    </div>
  );
}
