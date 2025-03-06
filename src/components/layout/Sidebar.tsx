'use client';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const menuItems = [
    {
      name: 'Inicio',
      icon: HomeIcon,
      href: '/dashboard'
    },
  ];

  return (
    <aside className="hidden">
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center p-1 text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
          >
          
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;


