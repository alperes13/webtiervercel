import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const runtime = 'nodejs';
export const revalidate = 60;

export async function GET() {
  try {
    const result = await query(
      "SELECT key, value FROM app_settings WHERE key IN ('maintenance_mode', 'cro_mini_enabled', 'cro_ultra_enabled')"
    );
    const map: Record<string, string> = {};
    for (const row of result.rows as { key: string; value: string }[]) {
      map[row.key] = row.value;
    }
    return NextResponse.json({
      maintenance_mode: map['maintenance_mode'] === 'true',
      cro_mini_enabled: map['cro_mini_enabled'] !== 'false',
      cro_ultra_enabled: map['cro_ultra_enabled'] !== 'false',
    });
  } catch (error) {
    console.error('Error fetching maintenance setting:', error);
    return NextResponse.json(
      { maintenance_mode: false, cro_mini_enabled: true, cro_ultra_enabled: true },
      { status: 500 }
    );
  }
}
