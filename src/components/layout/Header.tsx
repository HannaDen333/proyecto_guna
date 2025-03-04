//src/components/layout/Header.tsx
'use client';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-red-200 shadow-md">
      <div className="mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Panel de Administración
        </h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-md">
            <UserCircleIcon className="h-10 w-10 text-red-600" />
            <span className="text-gray-800 font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


