import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const awaitedParams = await params;
  try {
    const sign = await prisma.signs.findFirst({
      where: { name: awaitedParams.name }
    });
    if (!sign) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const serialized = JSON.parse(JSON.stringify(sign, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
    return NextResponse.json(serialized);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
} 