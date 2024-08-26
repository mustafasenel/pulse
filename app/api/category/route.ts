import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  try {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          mode: 'insensitive', // Case-insensitive search
        },
      },
    });

    const responseBody = JSON.stringify({ data: categories });

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
