# ChatPyME

Demo de chatbot WhatsApp con IA para PyMEs argentinas. Simula la recepcionista virtual de una clínica ficticia.

## Commands

```bash
pnpm dev          # dev server (webpack, port 3000)
pnpm build        # production build
pnpm lint         # eslint
```

## Architecture

Next.js 16 App Router, single-page app. No database, no auth, no persistence.

- **API route** (`src/app/api/chat/route.ts`): validates input (Zod v4), rate-limits by IP (15/hr), calls Groq (Llama 3.3 70B). Falls back to `[DEMO MODE]` without `GROQ_API_KEY`.
- **System prompt** (`src/lib/clinicPrompt.ts`): interpolates all data from `src/data/clinic.ts`. Injects a 7-day calendar so the model copies dates instead of computing them.
- **Intent protocol**: the model emits `[INTENT:APPOINTMENT]{...}` or `[INTENT:HANDOFF]` tokens. The client-side parser (`src/lib/intents.ts`) strips them and routes to `AppointmentCard` or `HandoffBanner`.
- **UI** (`src/components/Chatbot.tsx`): client component, orchestrates fetch + state + intent routing. WhatsApp-fidelity palette defined in `globals.css` via Tailwind v4 `@theme`.

## Key patterns

- **Retargeting**: edit `src/data/clinic.ts` to change the entire bot's knowledge base.
- **Seeded greeting**: injected client-side in `useEffect` to avoid SSR hydration mismatch on timestamps.
- **Timestamps**: 24h format via `hour12: false` to match WhatsApp and avoid locale-dependent "p. m." spacing.
- **Date injection**: `localIso()` uses local timezone (not UTC) to avoid off-by-one at night in ART (UTC-3).
