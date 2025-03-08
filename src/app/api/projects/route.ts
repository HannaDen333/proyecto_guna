// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener todas las aplicaciones/proyectos
    const applications = await prisma.securityApplicationSystems.findMany({
      select: {
        ApplicationId: true,
        ApplicationName: true,
        Description: true
      }
    });
    
    const formattedApplications = applications.map(app => ({
      id: app.ApplicationId,
      name: app.ApplicationName || 'Proyecto sin nombre',
      description: app.Description || 'Sin descripción'
    }));
    
    return NextResponse.json(formattedApplications);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    return NextResponse.json(
      { error: 'Error al obtener proyectos', details: error.message }, 
      { status: 500 }
    );
  }
}