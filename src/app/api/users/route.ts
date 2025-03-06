// src/app/api/users/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // BUSCA DIRECTAMENTE DE LA VISTA
    const users = await prisma.$queryRaw`SELECT * FROM vw_UserInfo`
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}