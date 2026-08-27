import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { relations } from "./relations";

/**
 * Server-only Drizzle client for Supabase Postgres.
 *
 * Use the pooled connection string (`DATABASE_URL`) from Supabase Connect.
 * `prepare: false` is required for Supabase transaction-mode pooling.
 *
 * Do not import this from Client Components — it talks to Postgres directly
 * with the DB password. App CRUD goes through server actions in `src/services`.
 * Auth still uses supabase-js.
 */
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example → .env.local and paste your Supabase pooled connection string.",
    );
  }

  const client = postgres(url, { prepare: false });
  return drizzle({ client, relations });
}

const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof createDb>;
};

export const db = globalForDb.db ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
