'use client';
import Link from 'next/link';
import { 
  UsersIcon, 
  UserGroupIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const menuItems = [
    {
      name: 'Inicio',
      icon: HomeIcon,
      href: '/dashboard'
    },
    {
      name: 'Usuarios',
      icon: UsersIcon,
      href: '/dashboard/users'
    },
    {
      name: 'Roles',
      icon: UserGroupIcon,
      href: '/dashboard/roles'
    }
  ];

  return (
    <aside className="bg-white w-64 h-screen border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Menú Principal
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;