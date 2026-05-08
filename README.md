# ChatPyME — WhatsApp AI chatbot demo

[![Next.js](https://img.shields.io/badge/next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/groq-llama%203.3%2070B-f55036?logo=meta&logoColor=white)](https://groq.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE)

Public demo of an AI chatbot designed for LATAM SMBs. The bot acts as the virtual receptionist for a fictional clinic — it answers questions, books appointments, and hands off to a human when needed.

**Stack**: Next.js 16 · Groq (Llama 3.3 70B) · Zod v4 · Tailwind CSS v4 · Vercel Analytics

## Quick start

```bash
pnpm install
cp .env.local.example .env.local
# Fill in GROQ_API_KEY with your key from https://console.groq.com/keys
pnpm dev
# Open http://localhost:3000
```

Without `GROQ_API_KEY`, the bot replies with a `[DEMO MODE]` placeholder.

## Retargeting it for your business

Edit a single file: `src/data/clinic.ts`. Change name, address, phone, hours, specialties, and accepted insurance plans. The system prompt and the bot reconfigure automatically.

## How it connects to WhatsApp Business Cloud API in production

In the demo, the chat is a web UI that mimics WhatsApp. In production the flow is:

```
User sends a message via WhatsApp
  → Meta delivers a webhook POST /webhook/whatsapp
  → Your server verifies the payload's HMAC signature
  → Extracts messages[0].text.body
  → Calls the same /api/chat endpoint with the history
  → Receives the bot's reply
  → POST https://graph.facebook.com/v19.0/{phone-id}/messages
    with the reply as text
  → The user receives the response on their WhatsApp
```

That's what the paid service delivers: the Meta integration, signature verification, session management, and deployment to real infrastructure. The demo proves the bot's brain works.

## Project layout

```
src/
  app/
    api/chat/route.ts   — validation, rate limit, Groq call
    page.tsx             — phone-frame wrapper
    layout.tsx           — metadata, fonts, analytics
    globals.css          — Tailwind v4 @theme (WhatsApp palette)
  components/
    Chatbot.tsx          — state and fetch orchestrator
    Header.tsx           — green bar with avatar and "online" indicator
    MessageBubble.tsx    — user/bot bubble with timestamp
    TypingIndicator.tsx  — three animated dots
    QuickReplies.tsx     — quick-reply chips
    AppointmentCard.tsx  — confirmed appointment card
    HandoffBanner.tsx    — human handoff notice
  data/
    clinic.ts            — clinic data (source of truth)
  lib/
    clinicPrompt.ts      — system prompt + buildMessages()
    intents.ts           — [INTENT:*] token parser
```

## About the author / Sobre el autor

**EN** — Built by **Federico Cione**, a backend engineer from Argentina. I build typed, tested, AI-integrated backends and conversational interfaces for product teams. Available for **WhatsApp AI chatbot** engagements. [Book a discovery call →](https://fedecione-portfolio.vercel.app/#contact)

**ES** — Hecho por **Federico Cione**, desarrollador backend argentino. Construyo backends tipados, testeados y con IA integrada, e interfaces conversacionales para equipos de producto. Disponible para paquetes de **chatbot WhatsApp con IA**. [Agendá una llamada →](https://fedecione-portfolio.vercel.app/#contact)

- Portfolio: [fedecione-portfolio.vercel.app](https://fedecione-portfolio.vercel.app)
- GitHub: [github.com/FedeCione](https://github.com/FedeCione)

## License

[MIT](./LICENSE) © Federico Cione
