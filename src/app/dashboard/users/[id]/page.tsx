// src/app/dashboard/users/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id;
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // En una implementación real, estos datos vendrían de la API
  const user = {
    compania: 'Distribuidora XYZ',
    cedis: '001',
    departamento: 'IT',
    puesto: 'Desarrollador',
    numeroEmpleado: '12345',
    nombreCompleto: 'Juan Pérez',
    correo: 'juan.perez@example.com',
    rfc: 'PEJF851230XYZ',
    telefono: '555-123-4567',
    claims: [
      { type: 'Nombre', value: 'Juan Pérez' },
      { type: 'Proyecto', value: 'x' },
      { type: 'Roles', value: 'x' },
      { type: 'departamento', value: 'IT' }
    ]
  };

  // Proyectos disponibles
  const projects = [
    { 
      id: '1', 
      name: 'Proyecto X',
      roles: ['Admin', 'x', 'Editor']
    },
    { 
      id: '2', 
      name: 'Proyecto Y',
      roles: ['Admin', 'Supporte', 'Manager']
    },
    { 
      id: '3', 
      name: 'Proyecto Z',
      roles: ['Desarrollador', 'Tester', 'PM']
    }
  ];

  // Roles asignados
  const assignedRoles = {
    '1': ['X'],
    '2': ['Y'],
    '3': ['Z']
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

        {/* Claims Section (ahora parte de la información general) */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">CLAIMS (MAS DATOS DEL USUARIO)</h3>
          {user.claims.length > 0 ? (
            <div className="bg-gray-50 p-3 rounded">
              {user.claims.map((claim, index) => (
                <div key={index} className="flex items-center mb-1">
                  <span className="text-xs font-medium text-gray-500 w-24">{claim.type}:</span>
                  <span className="text-sm text-gray-900">{claim.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Claims disponibles.</p>
          )}
        </div>
      </div>

      {/* Sección de Proyectos y Roles */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Proyectos y Roles</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Lista de Proyectos */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="font-medium">Proyectos</h3>
            </div>
            <div className="p-2">
              {projects.map(project => (
                <div 
                  key={project.id}
                  className={`p-2 cursor-pointer rounded ${activeProject === project.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveProject(project.id)}
                >
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs text-gray-500">
                    {assignedRoles[project.id]?.length 
                      ? `Roles: ${assignedRoles[project.id].join(', ')}` 
                      : 'Sin roles asignados'}
                  </div>
                </div>
              ))}
              <button className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Asignar Nuevo Proyecto
              </button>
            </div>
          </div>
         
          {/* Roles del Proyecto Seleccionado */}
          <div className="border rounded-lg overflow-hidden lg:col-span-2">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="font-medium">
                {activeProject 
                  ? `Roles en ${projects.find(p => p.id === activeProject)?.name}` 
                  : 'Seleccione un proyecto para ver los roles'}
              </h3>
            </div>
            <div className="p-4">
              {activeProject ? (
                <>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Roles Disponibles:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {projects.find(p => p.id === activeProject)?.roles.map((role, idx) => {
                        const isAssigned = assignedRoles[activeProject]?.includes(role);
                        return (
                          <div 
                            key={idx}
                            className={`border p-2 rounded flex items-center justify-between ${
                              isAssigned ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            <span>{role}</span>
                            <button 
                              className={`text-xs px-2 py-1 rounded ${
                                isAssigned 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-blue-500 text-white'
                              }`}
                            >
                              {isAssigned ? 'Quitar' : 'Asignar'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 py-6">
                  Seleccione un proyecto para administrar sus roles
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
