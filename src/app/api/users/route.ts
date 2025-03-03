// src/app/api/users/route.ts
// en este codigo se hizo un endpoint GET nextjs, SI TODO MARCCHA  BIEN DEVUELVE INFORMACION DE LA BASE DE DATOS EN FORMATO JSON SI NO RESRESA ERROR 500
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() { // funcion que maneja las solicitudes http de esa ruta
  try {
    // DIRECTO DE LA VISTA vw_UserInfo
    const users = await prisma.$queryRaw`SELECT * FROM vw_UserInfo` // $queryRaw` es util para ejecutar consultas sin el orm de prisma , util para las vistas , que no hace aun prisma
    return NextResponse.json(users)
  } catch (error) { 
    console.error('Error al obtener usuarios:', error)
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}
