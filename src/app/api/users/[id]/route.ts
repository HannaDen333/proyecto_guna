//src/app/api/users/id/route
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
    
    // Obtener todos los proyectos (SecurityApplicationSystems)
    // Para un enfoque más simple, no filtramos por usuario
    const allProjects = await prisma.securityApplicationSystems.findMany({
      select: {
        ApplicationId: true,
        ApplicationName: true,
        Description: true
      }
    });
    
    // Obtener todos los roles (AspNetRoles)
    const allRoles = await prisma.aspNetRoles.findMany({
      select: {
        Id: true,
        Name: true
      }
    });
    
    // Formatear los datos para el frontend
    const userProjects = allProjects.map(project => ({
      id: project.ApplicationId,
      name: project.ApplicationName || 'Aplicación sin nombre',
      description: project.Description || '',
      // Asignar un rol aleatorio a cada proyecto (sólo para demostración)
      roles: allRoles.slice(0, 2).map(role => ({
        id: role.Id,
        name: role.Name || 'Rol sin nombre'
      }))
    }));
    
    // Devolver la información completa
    return NextResponse.json({
      ...userData,
      projects: userProjects
    });
    
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    return NextResponse.json({ error: 'Error al obtener detalles del usuario', details: error.message }, { status: 500 });
  }
}