import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';

export const runtime = 'nodejs';
export const revalidate = 60; // default cache for 60 seconds

export async function GET() {
  try {
    const result = await queryOne('SELECT value FROM app_settings WHERE key = $1', ['maintenance_mode']);
    return NextResponse.json({ maintenance_mode: result?.value === 'true' });
  } catch (error) {
    console.error('Error fetching maintenance setting:', error);
    return NextResponse.json({ maintenance_mode: false }, { status: 500 });
  }
}
