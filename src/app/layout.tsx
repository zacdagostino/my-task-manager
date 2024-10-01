// src/app/layout.tsx
import './globals.css'; // Global CSS for your entire app
import { ReactNode } from 'react';

export default function RootLayout({
  children, // This represents the content of the individual pages (like the KanbanBoard).
}: {
  children: ReactNode; // Type for React's children prop.
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {/* Define a global layout that applies to all pages */}
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Kanban Task Manager</h1>
        </header>

        {/* Main content area */}
        <main className="p-6">
          {children} {/* This renders the content of the individual page (e.g., KanbanBoard from page.tsx) */}
        </main>

        {/* Footer (optional) */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2024 Task Manager</p>
        </footer>
      </body>
    </html>
  );
}
