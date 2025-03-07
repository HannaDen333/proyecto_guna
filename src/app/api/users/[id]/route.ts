// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employeeNumber = params.id;
    
    // Buscar información del usuario en la vista vw_UserInfo
    const userInfo = await prisma.$queryRaw`
      SELECT * FROM vw_UserInfo WHERE EmployeeNumber = ${employeeNumber}
    `;
    
    // Verificar si se encontró el usuario
    if (!Array.isArray(userInfo) || userInfo.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    
    const userData = userInfo[0];
    const userId = userData.UserId;
    
    // Obtener proyectos/aplicaciones y roles desde la vista vw_UsuariosProyectosRoless
    const userProjectsRoles = await prisma.$queryRaw`
      SELECT * FROM vw_UsuariosProyectosRoless 
      WHERE UserId = ${userId}
    `;
    
    // Procesar los datos para agrupar roles por proyecto/aplicación
    const projectsMap = new Map();
    
    if (Array.isArray(userProjectsRoles) && userProjectsRoles.length > 0) {
      userProjectsRoles.forEach(item => {
        const projectId = item.ProyectoId;
        
        if (!projectsMap.has(projectId)) {
          projectsMap.set(projectId, {
            id: projectId,
            name: item.NombreProyecto || 'Aplicación sin nombre',
            description: item.DescripcionProyecto || 'Sin descripción',
            roles: []
          });
        }
        
        // Agregar rol si no está duplicado y es válido
        if (item.RolId) {
          const project = projectsMap.get(projectId);
          const roleExists = project.roles.some(role => role.id === item.RolId);
          
          if (!roleExists) {
            project.roles.push({
              id: item.RolId,
              name: item.NombreRol || 'Rol sin nombre'
            });
          }
        }
      });
    }
    
    // Convertir el Map a un array de proyectos/aplicaciones
    const userProjects = Array.from(projectsMap.values());
    
    // Devolver la información completa
    return NextResponse.json({
      ...userData,
      projects: userProjects
    });
    
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    return NextResponse.json(
      { error: 'Error al obtener detalles del usuario', details: error.message }, 
      { status: 500 }
    );
  }
}