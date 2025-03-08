// src/app/api/roles/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener todos los roles
    const roles = await prisma.aspNetRoles.findMany({
      select: {
        Id: true,
        Name: true
      }
    });
    
    const formattedRoles = roles.map(role => ({
      id: role.Id,
      name: role.Name || 'Rol sin nombre'
    }));
    
    return NextResponse.json(formattedRoles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    return NextResponse.json(
      { error: 'Error al obtener roles', details: error.message }, 
      { status: 500 }
    );
  }
}
