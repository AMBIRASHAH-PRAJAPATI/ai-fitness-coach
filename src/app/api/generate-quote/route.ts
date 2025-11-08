import { getMotivationQuote } from '@/lib/motivationQuoteService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const motivationQuote = await getMotivationQuote();
    return NextResponse.json({ motivationQuote });
  } catch (error: any) {
    console.error("Error in motivation quote:", error);
    return NextResponse.json(
      { error: "Failed to generate MotivationQuote", details: error.message },
      { status: 500 }
    );
  }
}