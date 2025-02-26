
'use client';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  
  const [step, setStep] = useState(1);
  
  // Estado para guardar los datos de búsqueda
  const [searchData, setSearchData] = useState({
    compania: '',
    numeroEmpleado: ''
  });
  
  // Estado para guardar los datos del usuario encontrado
  const [userData, setUserData] = useState(null);
  
  // Estado para mostrar cuando se está cargando algo
  const [loading, setLoading] = useState(false);
  
  // Estado para guardar los datos del formulario de creación
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  
  // Estado para guardar el error de la contraseña
  const [passwordError, setPasswordError] = useState('');

  // Lista de compañías (ejemplo, normalmente vendría de una base de datos)
  const companias = [
    { id: 1, nombre: 'Distribuidora XYZ' },
    { id: 2, nombre: 'Comercial ABC' },
    { id: 3, nombre: 'Logística ACME' }
  ];

  // Esta función maneja los cambios en cualquier input o select
  const handleChange = (e) => {
    // Obtenemos el nombre y valor del campo que cambió
    const { name, value } = e.target;
    
    // Dependiendo del paso, actualizamos el estado correspondiente
    if (step === 1) {
      // Si estamos en el paso 1, actualizamos los datos de búsqueda
      setSearchData(prev => ({ ...prev, [name]: value }));
    } else {
      // Si estamos en el paso 2, actualizamos los datos del formulario
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Si el campo que cambió es la contraseña, validamos
      if (name === 'password') {
        validatePassword(value);
      }
    }
  };
  if

  // Función para validar la contraseña
  const validatePassword = (password) => {
    // Verificamos si tiene al menos 6 caracteres
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
 
    

    
    // Verificamos si tiene al menos una mayúscula
    if (!/[A-Z]/.test(password)) {
      setPasswordError('La contraseña debe tener al menos una letra mayúscula');
      return false;
    }
    
    // Verificamos si tiene al menos un caracter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('La contraseña debe tener al menos un carácter especial');
      return false;
    }
    
    // Si pasa todas las validaciones, limpiamos el error
    setPasswordError('');
    return true;
  };

  // Función para buscar un empleado (simula una llamada a API)
  const handleSearch = (e) => {
    // Evita que la página se recargue al enviar el formulario
    e.preventDefault();
    
    // Activa el estado de carga
    setLoading(true);
    
    // Simulamos una llamada a una API con un retraso de 1 segundo
    setTimeout(() => {
      // Estos serían los datos que vendrian de la base de datos
      const mockUser = {
        compania: 'Distribuidora XYZ',
        cedis: '001',
        departamento: 'IT',
        puesto: 'Desarrollador',
        numeroEmpleado: searchData.numeroEmpleado,
        nombreCompleto: 'Juan Pérez',
      };
      
      // Guardamos los datos del usuario encontrado
      setUserData(mockUser);
      
      // Desactivamos el estado de carga
      setLoading(false);
      
      // Avanzamos al paso 2
      setStep(2);
    }, 1000);
  };

  // Función para enviar el formulario completo
  const handleSubmit = (e) => {
    // Evita que la página se recargue
    e.preventDefault();
    
    // Validamos la contraseña antes de enviar
    if (!validatePassword(formData.password)) {
      return; // Si hay error, no continuamos
    }
    
    // Combinamos los datos del usuario y el formulario
    const fullUserData = {
      ...userData,
      ...formData
    };
    
    // Aquí iría el código para guardar en la base de datos
    console.log('Datos para crear usuario:', fullUserData);
    
    // Reiniciamos todos los estados
    setStep(1);
    setSearchData({ compania: '', numeroEmpleado: '' });
    setUserData(null);
    setFormData({ correo: '', password: '' });
    setPasswordError('');
    
    // Cerramos el modal
    onClose();
  };

  // Función para volver al paso 1
  const resetForm = () => {
    setStep(1);
    setUserData(null);
  };

  return (
    // Esto es el modal que aparece y desaparece con animación
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        {/* Fondo oscuro detrás del modal */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        {/* Contenido del modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              {/* Título del modal que cambia según el paso */}
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                {step === 1 ? 'Buscar Empleado' : 'Crear Usuario'}
              </Dialog.Title>

              {/* Paso 1: Formulario de búsqueda */}
              {step === 1 ? (
                <form onSubmit={handleSearch} className="mt-4 space-y-4">
                  {/* Selector de compañía */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Compañía del Empleado
                    </label>
                    <select
                      name="compania"
                      value={searchData.compania}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Seleccionar compañía</option>
                      {companias.map(comp => (
                        <option key={comp.id} value={comp.nombre}>
                          {comp.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Campo para número de empleado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Número de Empleado
                    </label>
                    <div className="flex mt-1">
                      <input
                        type="text"
                        name="numeroEmpleado"
                        value={searchData.numeroEmpleado}
                        onChange={handleChange}
                        className="block w-full rounded-l-md border border-gray-300 px-3 py-2"
                        required
                      />
                      {/* Botón de búsqueda */}
                      <button
                        type="submit"
                        className="rounded-r-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                        disabled={loading}
                      >
                        {loading ? 'Buscando...' : 'Buscar'}
                      </button>
                    </div>
                  </div>

                  {/* Botón de cancelar */}
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                /* Paso 2: Formulario para completar datos del usuario */
                <form onSubmit={handleSubmit} className="mt-4">
                  {/* Mostrar datos del empleado encontrado */}
                  {userData && (
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <h3 className="text-sm font-semibold mb-2">Datos del Empleado:</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Compañía:</span>
                          <span className="ml-1">{userData.compania}</span>
                        </div>
                        <div>
                          <span className="font-medium">CEDIS:</span>
                          <span className="ml-1">{userData.cedis}</span>
                        </div>
                        <div>
                          <span className="font-medium">Departamento:</span>
                          <span className="ml-1">{userData.departamento}</span>
                        </div>
                        <div>
                          <span className="font-medium">Puesto:</span>
                          <span className="ml-1">{userData.puesto}</span>
                        </div>
                        <div>
                          <span className="font-medium">Número:</span>
                          <span className="ml-1">{userData.numeroEmpleado}</span>
                        </div>
                        <div>
                          <span className="font-medium">Nombre:</span>
                          <span className="ml-1">{userData.nombreCompleto}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Campo para correo electrónico */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    
                    {/* Campo para contraseña con validación */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${
                          passwordError ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2`}
                        required
                      />
                      {/* Mostrar mensaje de error si hay uno */}
                      {passwordError && (
                        <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                      )}
                      {/* Instrucciones para la contraseña */}
                      <p className="mt-1 text-xs text-gray-500">
                        La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un carácter especial.
                      </p>
                    </div>

                    {/* Botones de acción */}
                    <div className="mt-6 flex justify-between">
                      {/* Botón para volver al paso 1 */}
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                        onClick={resetForm}
                      >
                        Volver
                      </button>
                      <div className="space-x-3">
                        {/* Botón para cancelar */}
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                          onClick={onClose}
                        >
                          Cancelar
                        </button>
                        {/* Botón para guardar */}
                        <button
                          type="submit"
                          className={`rounded-md bg-blue-500 px-4 py-2 text-sm text-white ${
                            passwordError ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                          }`}
                          disabled={!!passwordError}
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}