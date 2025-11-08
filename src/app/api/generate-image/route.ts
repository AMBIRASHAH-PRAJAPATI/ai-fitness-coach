import { generateImage } from '@/lib/imageService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();;
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }
    const image = await generateImage(prompt);
    return NextResponse.json({ image });
  } catch (error: any) {
    console.error("Error in image generation:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: error.message },
      { status: 500 }
    );
  }
}