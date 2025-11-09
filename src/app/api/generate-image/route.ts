import { generateImage } from '@/lib/imageService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }
    const image = await generateImage(text);
    return NextResponse.json({ image });
  } catch (error: any) {
    console.error("Error in image generation:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: error.message },
      { status: 500 }
    );
  }
}