// src/services/userService.ts
export async function getUsers() {
  try {
    const response = await fetch('/api/users')
    if (!response.ok) {
      throw new Error('Error al obtener usuarios')
    }
    return await response.json()
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw error
  }
}


  