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

export async function POST(request: NextRequest) {
  const input = await request.json();
  // use google cloud API to do the detection and translation. did not 
  const api_key = "my-api";
  //japanese character range
  const japChar = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9faf]/;
  if (japChar.test(input)) {
    return input;
  }
  try {
    // use google api to translate english to japanese
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: input,
          target: "ja",
          format: "text",
          key: api_key
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ translated:data.data.translations[0].translatedText});
  }
  catch (e) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
  
}