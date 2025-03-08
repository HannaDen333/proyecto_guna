
//src/app/dasboard/page.tsx
// src/app/dashboard/page.tsx
//src/app/dasboard/page.tsx

'use client'
import { useState, useEffect } from 'react'
import UserModal from '@/components/users/UserModal'
import { getUsers } from '@/services/userService'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchField, setSearchField] = useState('employeeNumber') // Campo de búsqueda por defecto
  const router = useRouter()
  
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        const data = await getUsers()
        console.log("Usuarios obtenidos:", data)
        setUsers(data)
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
        setError("Hubo un problema al cargar los usuarios")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Filtrar usuarios basado en el término de búsqueda y el campo seleccionado
  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true
    
    // Convertir término de búsqueda a minúsculas para comparación sin distinción entre mayúsculas y minúsculas
    const searchTermLower = searchTerm.toLowerCase()
    
    // Seleccionar el campo por el cual filtrar
    switch (searchField) {
      case 'employeeNumber':
        return (user.EmployeeNumber || '').toLowerCase().includes(searchTermLower)
      case 'name':
        return (user.Name || '').toLowerCase().includes(searchTermLower)
      case 'email':
        return (user.Email || '').toLowerCase().includes(searchTermLower)
      case 'company':
        return (user.KeyCompany || '').toLowerCase().includes(searchTermLower)
      case 'all':
        // Buscar en todos los campos
        return (
          (user.EmployeeNumber || '').toLowerCase().includes(searchTermLower) ||
          (user.Name || '').toLowerCase().includes(searchTermLower) ||
          (user.Email || '').toLowerCase().includes(searchTermLower) ||
          (user.KeyCompany || '').toLowerCase().includes(searchTermLower)
        )
      default:
        return false
    }
  })

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Función para manejar el clic en una fila
  const handleRowClick = (employeeNumber) => {
    router.push(`/dashboard/users/${employeeNumber}`)
  }

  // Obtener el placeholder adecuado según el campo seleccionado
  const getPlaceholder = () => {
    switch (searchField) {
      case 'employeeNumber':
        return 'Buscar por número de empleado'
      case 'name':
        return 'Buscar por nombre'
      case 'email':
        return 'Buscar por correo electrónico'
      case 'company':
        return 'Buscar por compañía'
      case 'all':
        return 'Buscar en todos los campos'
      default:
        return 'Buscar'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Usuarios</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:opacity-90 transition"
        >
          Habilitar cuenta
        </button>
      </div>

      {/* Buscador con selector de campo */}
      <div className="mb-6">
        <div className="flex items-center bg-white rounded-lg shadow-md">
          {/* Selector de campo de búsqueda */}
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="border-none bg-transparent text-gray-600 font-medium pl-4 py-2 rounded-l-lg focus:outline-none"
          >
            <option value="employeeNumber">Número de Empleado</option>
            <option value="name">Nombre</option>
            <option value="email">Correo</option>
            <option value="company">Compañía</option>
            <option value="all">Todos los campos</option>
          </select>

          {/* Separador vertical */}
          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {/* Campo de búsqueda */}
          <div className="flex items-center w-full">
            <svg
              className="h-5 w-5 text-gray-400 mx-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder={getPlaceholder()}
              className="w-full px-4 py-2 rounded-lg focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Resetear a la primera página al buscar
              }}
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('')
                setCurrentPage(1) // Resetear a la primera página al limpiar búsqueda
              }}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-lg">Cargando usuarios...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 text-lg">{error}</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-center text-lg text-gray-500">
            {searchTerm ? `No se encontraron usuarios que coincidan con la búsqueda por ${
              searchField === 'employeeNumber' ? 'número de empleado' :
              searchField === 'name' ? 'nombre' :
              searchField === 'email' ? 'correo electrónico' :
              searchField === 'company' ? 'compañía' : 'todos los campos'
            }` : "No hay usuarios disponibles"}
          </div>
        ) : (
          <>
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md">
                <tr>
                  <th className="px-6 py-4 text-left font-medium tracking-wider">Compañía</th>
                  <th className="px-6 py-4 text-left font-medium tracking-wider">Unidad</th>
                  <th className="px-6 py-4 text-left font-medium tracking-wider">Departamento</th>
                  <th className="px-6 py-4 text-left font-medium tracking-wider">Puesto</th>
                  <th className="px-6 py-4 text-left font-medium tracking-wider">Número de Empleado</th>
                  <th className="px-6 py-4 text-left font-medium tracking-wider">Nombre Completo</th>
                  <th className="px-6 py-4 text-left font-medium tracking-wider">Correo</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr
                    key={user.UserId || user.id || index}
                    className="hover:bg-gradient-to-r from-red-100 to-blue-100 cursor-pointer transition ease-in-out duration-150"
                    onClick={() => handleRowClick(user.EmployeeNumber)}
                  >
                    <td className="px-6 py-4">{user.KeyCompany || '-'}</td>
                    <td className="px-6 py-4">{user.UnitName || '-'}</td>
                    <td className="px-6 py-4">{user.DepartmentName || '-'}</td>
                    <td className="px-6 py-4">{user.PlaceName || '-'}</td>
                    <td className="px-6 py-4">{user.EmployeeNumber || user.UserName || '-'}</td>
                    <td className="px-6 py-4">{user.Name || '-'}</td>
                    <td className="px-6 py-4">{user.Email || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginación */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a{" "}
                  <span className="font-medium">
                    {indexOfLastItem > filteredUsers.length ? filteredUsers.length : indexOfLastItem}
                  </span>{" "}
                  de <span className="font-medium">{filteredUsers.length}</span> usuarios
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Botón Anterior */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Anterior
                  </button>
                  
                  {/* Números de página simplificados */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Calculamos qué páginas mostrar basándonos en la página actual
                      let pageToShow;
                      if (totalPages <= 5) {
                        // Si hay 5 o menos páginas, mostramos todas
                        pageToShow = i + 1;
                      } else if (currentPage <= 3) {
                        // Si estamos en las primeras páginas
                        pageToShow = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        // Si estamos en las últimas páginas
                        pageToShow = totalPages - 4 + i;
                      } else {
                        // En medio: mostramos la página actual y las 2 anteriores y posteriores
                        pageToShow = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageToShow}
                          onClick={() => paginate(pageToShow)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === pageToShow
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {pageToShow}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Botón Siguiente */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

