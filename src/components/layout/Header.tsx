//SRC/COMPONENTS/LAYOUT/HEADER.JSX
'use client';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid';

const Header = () => {
  return (
    <header className="bg-blue-700 shadow-md">
      <div className="mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Panel de Administración
        </h1>
        <Link 
          href="/dashboard" 
          className="flex items-center space-x-2 bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md border border-blue-500 transition-all hover:bg-gray-100"
        >
          <HomeIcon className="h-6 w-6 text-blue-700" />
          <span className="font-medium">Inicio</span>
          
        </Link>
      </div>
    </header>
  );
};

export default Header;

 