import { getMotivationQuote } from '@/lib/motivationQuoteService';
import { NextResponse } from 'next/server';

// This will revalidate the data after each hour (3600s).
// For 1 hour, it will serve cached data, then update.
export const revalidate = 3600;

export async function GET() {
  try {
    const motivationQuote = await getMotivationQuote();
    return NextResponse.json({ quote: motivationQuote });
  } catch (error: any) {
    console.error("Error in motivation quote:", error);
    return NextResponse.json(
      { error: "Failed to generate MotivationQuote", details: error.message },
      { status: 500 }
    );
  }
}