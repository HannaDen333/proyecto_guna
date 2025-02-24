
'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  const [step, setStep] = useState(1);
  const [searchData, setSearchData] = useState({
    compania: '',
    numeroEmpleado: ''
  });
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  // Lista de compañías (esto normalmente vendría de la base de datos)
  const companias = [
    { id: 1, nombre: 'x' },
    { id: 2, nombre: 'y' },
    { id: 3, nombre: 'z' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (step === 1) {
      setSearchData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulando una llamada a la API
      // En una implementación real, esto sería una llamada fetch/axios
      console.log('Buscando empleado:', searchData);
      
      // Simulando datos de respuesta
      setTimeout(() => {
        const mockUser = {
          compania: 'Distribuidora X',
          cedis: '001',
          departamento: 'IT',
          puesto: 'Desarrollador',
          numeroEmpleado: searchData.numeroEmpleado,
          nombreCompleto: 'Juan Pérez',
        };
        //
        
        setUserData(mockUser);
        setLoading(false);
        setStep(2);
      }, 1000);
      
    } catch (error) {
      console.error('Error al buscar empleado:', error);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combinamos los datos del usuario con correo y contraseña
    const fullUserData = {
      ...userData,
      ...formData
    };
    
    console.log('Datos completos para crear usuario:', fullUserData);
    // Aquí iría la lógica para guardar en la base de datos
    
    // Resetear el estado
    setStep(1);
    setSearchData({ compania: '', numeroEmpleado: '' });
    setUserData(null);
    setFormData({ correo: '', password: '' });
    
    onClose();
  };

  const resetForm = () => {
    setStep(1);
    setUserData(null);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                {step === 1 ? 'Buscar Empleado' : 'Crear Usuario'}
              </Dialog.Title>

              {step === 1 ? (
                <form onSubmit={handleSearch} className="mt-4 space-y-4">
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
                      <button
                        type="submit"
                        className="rounded-r-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                        disabled={loading}
                      >
                        {loading ? 'Buscando...' : 'Buscar'}
                      </button>
                    </div>
                  </div>

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
                <form onSubmit={handleSubmit} className="mt-4">
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
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                        onClick={resetForm}
                      >
                        Volver
                      </button>
                      <div className="space-x-3">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                          onClick={onClose}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                        >
                          crear
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