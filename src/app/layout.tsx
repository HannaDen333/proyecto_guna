import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Panel de Administración',
  description: 'Sistema de administración de usuarios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head><link rel="icon" href="/public/favicon.ico"/></head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

// favicon
