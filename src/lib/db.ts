import { Pool, type QueryResult, type QueryResultRow } from 'pg';

const globalForPg = globalThis as unknown as { pgPool?: Pool };

function createPool(): Pool | null {
  const connectionString =
    process.env.POSTGRES_PRISMA_URL ||
    process.env.PRISMA_DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!connectionString) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('[db] POSTGRES_URL is not set. Database operations will fail if called.');
      return null;
    }
    throw new Error('POSTGRES_URL is not set');
  }

  return new Pool({
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 10_000,
  });
}

export const pool: Pool = (globalForPg.pgPool ?? createPool()) as Pool;

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pgPool = pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = []
): Promise<QueryResult<T>> {
  if (!pool) {
    throw new Error('Database pool is not initialized. Check your POSTGRES_URL environment variable.');
  }
  const start = Date.now();
  try {
    const result = await pool.query<T>(sql, params as never[]);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production' && duration > 500) {
      console.warn(`[db] slow query (${duration}ms): ${sql.slice(0, 120)}`);
    }
    return result;
  } catch (err) {
    console.error('[db] query failed:', sql.slice(0, 200), err);
    throw err;
  }
}

export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = []
): Promise<T | null> {
  const result = await query<T>(sql, params);
  return result.rows[0] ?? null;
}
