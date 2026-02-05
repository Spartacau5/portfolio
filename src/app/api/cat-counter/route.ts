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

export async function POST() {
  try {
    // Increment the counter atomically
    const count = await redis.incr(COUNTER_KEY);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Redis POST error:', error);
    return NextResponse.json({ count: INITIAL_COUNT }, { status: 500 });
  }
}
