import { existsSync } from "node:fs";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// CI injects DATABASE_URL. Locally, load .env.local or .env.prod.
if (!process.env.DATABASE_URL) {
  const envFile =
    process.env.DRIZZLE_ENV ??
    (process.env.npm_lifecycle_event?.includes(":prod")
      ? ".env.prod"
      : ".env.local");

  if (existsSync(envFile)) {
    config({ path: envFile });
  }
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  schemaFilter: ["public"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
