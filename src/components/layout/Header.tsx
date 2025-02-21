'use client';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Panel de Administración de Usuarios
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
            <span className="text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;