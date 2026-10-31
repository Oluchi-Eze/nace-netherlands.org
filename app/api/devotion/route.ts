import { NextResponse } from 'next/server';

export async function GET() {
  // A simple static or rotating daily devotion response
  const devotion = {
    verse: "Psalm 118:24 - This is the day the Lord has made; let us rejoice and be glad in it.",
    reflection: "Today is a fresh opportunity to walk in faith, love, and purpose. No matter what challenges you face, God's grace is sufficient.",
    prayer: "Lord, thank You for the gift of today. Guide our steps and fill our hearts with Your peace. Amen."
  };

  return NextResponse.json(devotion);
}