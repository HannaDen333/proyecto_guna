//src/app/dashboard/users/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface UserRole {
  id: string;
  name: string;
}

interface UserProject {
  id: string;
  name: string;
  description?: string;
  roles: UserRole[];
}

interface UserInfo {
  UserId: string;
  UserName?: string;
  Email?: string;
  KeyCompany?: string;
  AreaName?: string;
  UnitName?: string;
  DepartmentName?: string;
  PlaceName?: string;
  EmployeeNumber?: string;
  Name?: string;
  IsActive?: string;
  projects?: UserProject[];
}
interface userRole {
  id : string;

}
export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
        
        // Seleccionar el primer proyecto automáticamente si hay alguno
        if (userData.projects && userData.projects.length > 0) {
          setActiveProject(userData.projects[0].id);
        }
      } catch (err) {
        console.error('Error al cargar datos del usuario:', err);
        setError('No se pudo cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Proyectos disponibles para el usuario (con verificación segura)
  const projects = user?.projects || [];
  
  // Añadir log para depuración
  console.log('Datos del usuario recibidos:', user);
  console.log('Proyectos disponibles:', projects);
  
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-xl text-gray-600">Cargando información del usuario...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-6">
        <Link href="/dashboard" className="text-blue-500 hover:underline mb-4 inline-block">
          &larr; Volver
        </Link>
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error || 'No se pudo encontrar información del usuario'}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="text-blue-500 hover:underline mr-4">
          &larr; Volver
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          {user.Name || 'Usuario'}
        </h1>
      </div>

      {/* Información General */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Información General</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">NÚMERO DE EMPLEADO</h3>
            <p className="mt-1 text-sm text-gray-900">{user.EmployeeNumber || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">NOMBRE COMPLETO</h3>
            <p className="mt-1 text-sm text-gray-900">{user.Name || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">COMPAÑÍA</h3>
            <p className="mt-1 text-sm text-gray-900">{user.KeyCompany || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">ÁREA</h3>
            <p className="mt-1 text-sm text-gray-900">{user.AreaName || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">UNIDAD</h3>
            <p className="mt-1 text-sm text-gray-900">{user.UnitName || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">DEPARTAMENTO</h3>
            <p className="mt-1 text-sm text-gray-900">{user.DepartmentName || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">PUESTO</h3>
            <p className="mt-1 text-sm text-gray-900">{user.PlaceName || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">CORREO ELECTRÓNICO</h3>
            <p className="mt-1 text-sm text-gray-900">{user.Email || '-'}</p>
          </div>
        </div>
      </div>

      {/* Sección de Proyectos y Roles */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Proyectos y Roles</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Lista de Proyectos */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="font-medium">Proyectos</h3>
            </div>
            <div className="p-2">
              {projects && projects.length > 0 ? (
                projects.map(project => (
                  <div 
                    key={project.id}
                    className={`p-3 mb-2 cursor-pointer rounded-md border ${activeProject === project.id ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-50 border-gray-200'}`}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <div className="font-medium text-md mb-1">{project.name || project.id}</div>
                    <div className="text-xs text-gray-600 bg-gray-100 p-1 rounded">
                      {project.description || 'Sin descripción'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-md">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-2 font-medium">No hay proyectos asignados</p>
                  <p className="mt-1 text-sm">Este usuario no tiene proyectos asignados actualmente.</p>
                </div>
              )}
            </div>
          </div>
         
          {/* Roles del Proyecto Seleccionado */}
          <div className="border rounded-lg overflow-hidden lg:col-span-2">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-medium">
                {activeProject && projects && projects.length > 0
                  ? `Roles en ${projects.find(p => p.id === activeProject)?.name || activeProject}`
                  : 'Seleccione un proyecto para ver los roles'}
              </h3>
            </div>
            <div className="p-4">
              {activeProject && projects && projects.length > 0 ? (
                <>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Roles Asignados:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Roles del proyecto seleccionado */}
                      {projects.find(p => p.id === activeProject)?.roles?.length > 0 ? (
                        projects.find(p => p.id === activeProject)?.roles?.map((role, idx) => (
                          <div 
                            key={idx}
                            className="border border-green-200 p-3 rounded-md bg-green-50 flex items-center justify-between shadow-sm"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800">{role.name || role.id}</span>
                              <span className="text-xs text-gray-500">Rol asignado al usuario</span>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white font-medium">
                                Activo
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center p-4 bg-gray-50 rounded-md text-gray-500">
                          Este proyecto no tiene roles asignados al usuario.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-xl font-medium">No hay roles para mostrar</p>
                  <p className="mt-1">Seleccione un proyecto para ver los roles asignados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}