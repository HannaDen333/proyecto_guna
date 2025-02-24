// src/app/dashboard/users/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id;

  // En una implementación real, harías una llamada a la API para obtener los detalles del usuario
  // Estoy usando datos ejemplo , proximanente hare la llamada a la api
  const user = {
    compania: 'Distribuidora XYZ',
    cedis: '001',
    departamento: 'IT',
    puesto: 'Desarrollador',
    numeroEmpleado: '12345',
    nombreCompleto: 'Juan Pérez',
    correo: 'juan.perez@ejemplo.com',
    rfc: 'PEJF851230XYZ',
    telefono: '5544667788'
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="text-blue-500 hover:underline mr-4">
          &larr; Volver
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          {user.nombreCompleto}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Información General</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">NÚMERO DE EMPLEADO</h3>
            <p className="mt-1 text-sm text-gray-900">{user.numeroEmpleado}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">NOMBRE COMPLETO</h3>
            <p className="mt-1 text-sm text-gray-900">{user.nombreCompleto}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">COMPAÑÍA</h3>
            <p className="mt-1 text-sm text-gray-900">{user.compania}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">RFC</h3>
            <p className="mt-1 text-sm text-gray-900">{user.rfc}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">CORREO ELECTRÓNICO</h3>
            <p className="mt-1 text-sm text-gray-900">{user.correo}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">TELÉFONO CELULAR</h3>
            <p className="mt-1 text-sm text-gray-900">{user.telefono}</p>
          </div>
        </div>
      </div>

      {/* Secciones adicionales */}
      <div className="mt-6 grid grid-cols-1 gap-6">
        {/* Sección de Proyectos */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Proyectos Asignados</h2>
          <p className="text-gray-500">No hay proyectos asignados</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Asignar Proyecto
          </button>
        </div>

        {/* Sección de Roles */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Roles</h2>
          <p className="text-gray-500">No hay roles asignados</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Asignar Rol
          </button>
        </div>

        {/* Sección de Claims */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Claims (Sólo Lectura)</h2>
          <p className="text-gray-500">No hay claims disponibles</p>
        </div>
      </div>
    </div>
  );
}