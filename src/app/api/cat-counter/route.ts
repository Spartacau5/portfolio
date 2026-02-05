import { NextResponse } from 'next/server';

// For production, you'd want to use a database like Vercel KV, Redis, or similar
// This in-memory counter will reset on each deployment/restart
// But it will persist during the same server instance

let petCount = 12847; // Starting with a fun initial count

export async function GET() {
  return NextResponse.json({ count: petCount });
}

export async function POST() {
  petCount++;
  return NextResponse.json({ count: petCount });
}
