# Ecommerce Drizzle

This project uses **Drizzle ORM** with **Supabase (Postgres)** as the database.

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env`
```env
PORT=5000
JWT_SECRET=bolbona
SUPABASE_DB_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:6543/postgres?sslmode=require
```

⚠️ If your password has `@`, replace it with `%40`.

---

## Drizzle + Supabase Connection

### DB Connection (`db.ts`)
```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool);
```

This setup connects Drizzle ORM to your Supabase Postgres database using the connection string from `.env`.

---

## Database

### Generate migration
```bash
npx drizzle-kit generate
```

### Push migration
```bash
npx drizzle-kit push
```

---

## Test Query

```ts
import { db } from "./src/db/db";
import { users } from "./src/db/schema/users";

async function test() {
  const allUsers = await db.select().from(users);
  console.log(allUsers);
}

test();
```

