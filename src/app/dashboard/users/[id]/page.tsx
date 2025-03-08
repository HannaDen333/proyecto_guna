// src/app/dashboard/users/[id]/page.tsx


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

interface CatalogProject {
  id: string;
  name: string;
  description?: string;
}

interface CatalogRole {
  id: string;
  name: string;
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

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para catálogos
  const [allProjects, setAllProjects] = useState<CatalogProject[]>([]);
  const [allRoles, setAllRoles] = useState<CatalogRole[]>([]);
  const [loadingCatalogs, setLoadingCatalogs] = useState(false);
  const [selectedCatalogProject, setSelectedCatalogProject] = useState<string>('');
  const [selectedCatalogRole, setSelectedCatalogRole] = useState<string>('');

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

  // Efecto para cargar catálogos de proyectos y roles
  useEffect(() => {
    async function fetchCatalogs() {
      try {
        setLoadingCatalogs(true);
        
        // Cargar catálogo de proyectos
        const projectsResponse = await fetch('/api/projects');
        if (!projectsResponse.ok) {
          throw new Error(`Error cargando proyectos: ${projectsResponse.status}`);
        }
        const projectsData = await projectsResponse.json();
        setAllProjects(projectsData);
        
        // Cargar catálogo de roles
        const rolesResponse = await fetch('/api/roles');
        if (!rolesResponse.ok) {
          throw new Error(`Error cargando roles: ${rolesResponse.status}`);
        }
        const rolesData = await rolesResponse.json();
        setAllRoles(rolesData);
        
      } catch (err) {
        console.error('Error al cargar catálogos:', err);
      } finally {
        setLoadingCatalogs(false);
      }
    }
    
    fetchCatalogs();
  }, []);

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

      {/* Sección de Proyectos y Roles - Diseño Dashboard */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Proyectos y Roles Asignados</h2>
        
        {(!projects || projects.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <svg className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Sin proyectos asignados</h3>
            <p className="text-gray-500 text-center max-w-md">
              Este usuario no tiene proyectos asignados actualmente.
            </p>
          </div>
        ) : (
          <div>
            {/* Selector de Proyectos */}
            <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-3 scrollbar-hide">
              <div className="text-sm font-medium text-gray-700 whitespace-nowrap mr-2">Proyecto:</div>
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                    ${activeProject === project.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {project.name || project.id}
                </button>
              ))}
            </div>

            {/* Contenido del Proyecto */}
            {activeProject && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-medium text-gray-800">
                      {projects.find(p => p.id === activeProject)?.name || 'Proyecto'}
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm">
                      {projects.find(p => p.id === activeProject)?.description || 'Sin descripción'}
                    </p>
                  </div>
                  <div className="flex items-center bg-white px-3 py-1 rounded-full border shadow-sm">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm font-medium text-gray-700">Activo</span>
                  </div>
                </div>

                <div className="border-t border-b py-6 mb-6">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Rol del Usuario
                  </h4>

                  {projects.find(p => p.id === activeProject)?.roles?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {projects.find(p => p.id === activeProject)?.roles?.map((role, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                          <div className="flex items-center mb-2">
                            <div className="p-2 bg-white rounded-full mr-3 shadow">
                              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{role.name || 'Rol sin nombre'}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                  Activo
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
                        <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-medium text-gray-700 mb-1">Sin roles asignados</h5>
                      <p className="text-gray-500">No hay roles asignados para este proyecto</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Catálogo de Proyectos y Roles */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Catálogo de Proyectos y Roles</h2>
        
        {loadingCatalogs ? (
          <div className="flex justify-center items-center p-6">
            <div className="text-gray-500">Cargando catálogos...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selector de Proyectos */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Proyectos Disponibles</h3>
              <div className="relative">
                <select
                  value={selectedCatalogProject}
                  onChange={(e) => setSelectedCatalogProject(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 appearance-none"
                >
                  <option value="">Seleccione un proyecto</option>
                  {allProjects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              {selectedCatalogProject && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Proyecto seleccionado: </span>
                    {allProjects.find(p => p.id === selectedCatalogProject)?.name}
                  </p>
                </div>
              )}
            </div>
            
            {/* Selector de Roles */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Roles Disponibles</h3>
              <div className="relative">
                <select
                  value={selectedCatalogRole}
                  onChange={(e) => setSelectedCatalogRole(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 appearance-none"
                >
                  <option value="">Seleccione un rol</option>
                  {allRoles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              {selectedCatalogRole && (
                <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-lg">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Rol seleccionado: </span>
                    {allRoles.find(r => r.id === selectedCatalogRole)?.name}
                  </p>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="md:col-span-2 mt-4 flex justify-end">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                disabled={!selectedCatalogProject || !selectedCatalogRole}
              >
                Asignar proyecto  y rol
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}