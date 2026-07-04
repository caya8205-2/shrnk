import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// pakai DB_PATH dari env kalau ada (buat Railway Volume), fallback ke lokal
const dbPath = process.env.DB_PATH ?? "./shrnk.db";
const sqlite = new Database(dbPath);

export const db = drizzle(sqlite);

// jalanin migration otomatis tiap kali app start
// folder ./drizzle isinya file SQL hasil `drizzle-kit generate` yang udah lo commit
migrate(db, { migrationsFolder: path.resolve(__dirname, "../../drizzle") });