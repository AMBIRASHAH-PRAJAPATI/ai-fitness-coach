import { getMotivationQuote } from '@/lib/motivationQuoteService';
import { NextResponse } from 'next/server';

export const dynamic = "force-static";
// this will revalidate the data afetr each 60s the data will be updated 
// and for 60 sec it serve cached data and then update
export const revalidate = 60;
export async function GET() {
  try {
    // const motivationQuote = await getMotivationQuote();
    return NextResponse.json({ motivationQuote:"aa" });
  } catch (error: any) {
    console.error("Error in motivation quote:", error);
    return NextResponse.json(
      { error: "Failed to generate MotivationQuote", details: error.message },
      { status: 500 }
    );
  }
}