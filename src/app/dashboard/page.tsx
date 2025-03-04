//src/app/dashboard/page.tsx
'use client'
import { useState, useEffect } from 'react'
import UserModal from '@/components/users/UserModal'
import { getUsers } from '@/services/userService'

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Usuarios</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:opacity-90 transition"
        >
          Crear Usuario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-lg">Cargando usuarios...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 text-lg">{error}</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-lg text-gray-500">No hay usuarios disponibles</div>
        ) : (
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
              {users.map((user, index) => (
                <tr 
                  key={user.UserId || user.id || index}
                  className="hover:bg-gradient-to-r from-red-100 to-blue-100 cursor-pointer transition ease-in-out duration-150"
                  onClick={() => {
                    window.location.href = `/dashboard/users/${user.EmployeeNumber}`;
                  }}
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
        )}
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
