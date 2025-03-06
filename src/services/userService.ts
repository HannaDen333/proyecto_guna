// src/services/userService.ts

// Obtener todos los usuarios
export async function getUsers() {
  try {
    const response = await fetch('/api/users', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en servicio getUsers:', error);
    throw error;
  }
}

// Obtener un usuario por su ID (número de empleado)
export async function getUserById(employeeNumber: string) {
  try {
    const response = await fetch(`/api/users/${employeeNumber}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener usuario: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error en servicio getUserById(${employeeNumber}):`, error);
    throw error;
  }
}

// Crear un nuevo usuario
export async function createUser(userData: {
  compania: string;
  numeroEmpleado: string;
  correo: string;
  password: string;
}) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Error al crear usuario');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en servicio createUser:', error);
    throw error;
  }
}


  