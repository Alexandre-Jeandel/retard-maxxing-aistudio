# Deploy retardmaxxing.app

## TL;DR

```bash
# locally — push
cd C:/Project/retard_maxxing_web_page
git add -A && git commit -m "..." && git push origin master

# on server — pull + build + restart
ssh root@209.182.235.248
cd /var/www/retardmaxxing/retard-maxxing
git pull && npm run build && pm2 restart retardmaxxing
```

## Things to know

- **branch is `master`** on both local and server. github default may say `main` — ignore it. we use `master`.
- **process manager is PM2.** app name: `retardmaxxing`. only one instance — if you ever see two, delete the errored one.
- **frontend-only changes** technically don't need a restart (Express serves `dist/` as static; new files are picked up on next request). but always include `pm2 restart retardmaxxing` to be safe.
- **server.ts changes ALWAYS need a restart** — the running Node process holds the old code in memory until killed.

## When the page still shows old content

1. Cloudflare cache → dashboard → Caching → Configuration → **Purge Everything**.
2. Hard refresh in browser: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac).
3. Quick test bypassing cache: `https://retardmaxxing.app/?bust=1`.

## Diagnostic commands (server, single line each)

```bash
git log -1 --oneline                              # latest commit deployed
ls -la dist/index.html                            # build timestamp
pm2 list                                          # process status
curl https://retardmaxxing.app/api/subscriber-count   # API works
```

## Query subscribers DB

```bash
node -e "const db = require('better-sqlite3')('data/waitlist.db'); db.prepare('SELECT email, source, created_at FROM subscribers').all().forEach(r => console.log(r.email, r.source, r.created_at));"
```

## Branch trap (history)

On 2026-05-06 the server was on local branch `main` (stale) while local pushed to `origin/master`. `git pull` reported "Already up to date" while serving old code. Fixed by `git checkout -B master origin/master` on the server. Both now track `origin/master`. If it drifts again, repeat that command.

## What NOT to confuse with

- `C:\Project\retard-maxxing\` (dashes) — **The Altar V1**, don't touch.
- `-retard-maxxing-app` GitHub repo — unrelated, not used.
- decide.quest deploy uses `git pull && npm run build` only because it's static Vite, no Node server. retardmaxxing has Express, so PM2 restart is required for server changes.
