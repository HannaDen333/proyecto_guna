//src/components/layout/Header.tsx
'use client';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-red-200 shadow-md">
      <div className="mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Panel de Administración
        </h1>
        <Link 
          href="/dashboard" 
          className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md hover:bg-gray-100 transition-all"
        >
          <HomeIcon className="h-6 w-6 text-red-600" />
          <span className="text-gray-800 font-medium">Inicio</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;


