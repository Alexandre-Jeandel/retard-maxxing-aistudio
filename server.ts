import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import rateLimit from "express-rate-limit";

// Initialize SQLite database
const dbDir = path.join(process.cwd(), 'data');
fs.mkdirSync(dbDir, { recursive: true });
const db = new Database(path.join(dbDir, 'waitlist.db'));

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add source column on existing DBs that pre-date this schema (no-op if already present).
try {
  db.exec(`ALTER TABLE subscribers ADD COLUMN source TEXT`);
} catch {
  // already exists; ignore
}

const insertSubscriber = db.prepare('INSERT OR IGNORE INTO subscribers (email, source) VALUES (?, ?)');
const getSubscriberCount = db.prepare('SELECT COUNT(*) as count FROM subscribers');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10kb' }));

  // API routes FIRST
  app.post('/api/subscribe', subscribeLimiter, (req, res) => {
    const { email } = req.body;
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > 254) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Tag the row with the hostname this signup came from, so we can
    // distinguish retardmaxxing.app traffic from any future variants
    // sharing the same backend / waitlist DB.
    const host = (req.headers.host || '').toString().toLowerCase();
    const source = host.includes('retardmaxxing')
      ? 'retardmaxxing'
      : host.includes('thealtar')
        ? 'thealtar'
        : host || 'unknown';

    try {
      insertSubscriber.run(email, source);
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/subscriber-count', (req, res) => {
    try {
      const row = getSubscriberCount.get() as { count: number };
      res.json({ count: row.count });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
