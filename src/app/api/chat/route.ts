import { NextResponse } from 'next/server';
import { z } from 'zod/v4';

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(1000),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 15;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { ok: boolean; resetIn: number } {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, resetIn: WINDOW_MS };
  }
  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, resetIn: entry.resetAt - now };
  }
  entry.count += 1;
  return { ok: true, resetIn: entry.resetAt - now };
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

const DEMO_REPLY = '[DEMO MODE] Configurá GROQ_API_KEY para probar el chatbot.';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return NextResponse.json({ error: 'forbidden' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(ip);
  if (!rate.ok) {
    return NextResponse.json(
      { error: 'rate_limited', resetIn: rate.resetIn },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  // TODO(stage-2): wire Groq + buildMessages from @/lib/clinicPrompt.
  // Until the prompt module lands, always return the demo reply so this
  // route builds green in isolation.
  return NextResponse.json({ reply: DEMO_REPLY });
}
