// src/components/layout/Sidebar.tsx
'use client';
import Link from 'next/link';
import { 
  HomeIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const menuItems = [
    {
      name: 'Inicio',
      icon: HomeIcon,
      href: '/dashboard'
    },
    {
      name: 'Proyectos',
      icon: DocumentTextIcon,
      href: '/dashboard/projects'
    }
  ];

  return (
    <aside className="bg-gray-100 w-64 min-h-screen border-r shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Menú Principal
        </h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
            >
              <item.icon className="h-6 w-6 text-gray-600" />
              <span className="text-lg">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
