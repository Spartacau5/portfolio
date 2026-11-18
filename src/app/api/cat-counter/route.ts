import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client using Vercel KV environment variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const COUNTER_KEY = 'cat_pet_count';
const INITIAL_COUNT = 0; // Starting count

export async function GET() {
  try {
    let count = await redis.get<number>(COUNTER_KEY);

    // If no count exists yet, initialize it
    if (count === null) {
      await redis.set(COUNTER_KEY, INITIAL_COUNT);
      count = INITIAL_COUNT;
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Redis GET error:', error);
    // Fallback to initial count if Redis fails
    return NextResponse.json({ count: INITIAL_COUNT });
  }
}

// Rapid petting is batched client-side into one request with an `amount`.
// Capped so one request can't inflate the counter.
const MAX_BATCH = 25;

async function readAmount(req: Request): Promise<number> {
  try {
    // sendBeacon posts text/plain, so parse the raw body either way
    const body = JSON.parse(await req.text());
    const n = Math.floor(Number(body?.amount));
    return Number.isFinite(n) ? Math.min(Math.max(n, 1), MAX_BATCH) : 1;
  } catch {
    return 1;
  }
}

export async function POST(req: Request) {
  try {
    const amount = await readAmount(req);
    // Increment the counter atomically
    const count = amount === 1 ? await redis.incr(COUNTER_KEY) : await redis.incrby(COUNTER_KEY, amount);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Redis POST error:', error);
    return NextResponse.json({ count: INITIAL_COUNT }, { status: 500 });
  }
}
