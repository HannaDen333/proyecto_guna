'use client';
import { useState } from 'react';
import UserModal from '@/components/users/UserModal';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Datos de ejemplo para la tabla, luego hara la llamada a la api
  const users = [
    {
      compania: 'Distribuidora X',
      cedis: '001',
      departamento: 'IT',
      puesto: 'Desarrollador',
      numeroEmpleado: '12345',
      nombreCompleto: 'Juan Pérez',
      correo: 'juan.perez@example.com'
    },
    {
      compania: 'Distribuidora X',
      cedis: '002',
      departamento: 'RH',
      puesto: 'Reclutador',
      numeroEmpleado: '12346',
      nombreCompleto: 'María García',
      correo: 'maria.garcia@example.com'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Usuarios</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Crear Usuario
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compañía del Empleado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CEDIS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Puesto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número de Empleado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre Completo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Correo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  // Navegación a la vista detalle
                  window.location.href = `/dashboard/users/${user.numeroEmpleado}`;
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.compania}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.cedis}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.departamento}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.puesto}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.numeroEmpleado}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.nombreCompleto}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.correo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}