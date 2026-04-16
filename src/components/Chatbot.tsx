'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { clinic } from '@/data/clinic';
import { parseReply, type ParsedIntent } from '@/lib/intents';
import { Header } from './Header';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { QuickReplies } from './QuickReplies';
import { AppointmentCard } from './AppointmentCard';
import { HandoffBanner } from './HandoffBanner';

type BotOrUserMsg = {
  kind: 'chat';
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  seeded?: boolean;
  intent?: ParsedIntent;
};

type AgentMsg = {
  kind: 'agent';
  id: string;
  text: string;
  timestamp: string;
  senderLabel: string;
};

type BannerMsg = {
  kind: 'banner';
  id: string;
  variant: 'rate-limit' | 'error';
};

type LocalMsg = BotOrUserMsg | AgentMsg | BannerMsg;

const GREETING = `¡Hola! Soy el asistente de ${clinic.name}. Puedo darte info sobre horarios, especialidades u obras sociales, o ayudarte a reservar un turno. ¿En qué te ayudo?`;

function now(): string {
  return new Date().toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function id(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export function Chatbot() {
  const [messages, setMessages] = useState<LocalMsg[]>(() => [
    {
      kind: 'chat',
      id: id(),
      role: 'assistant',
      text: GREETING,
      timestamp: now(),
      seeded: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const [handoffActive, setHandoffActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track('chat_open');
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === 'sending' || handoffActive) return;

    const userMsg: LocalMsg = {
      kind: 'chat',
      id: id(),
      role: 'user',
      text: trimmed,
      timestamp: now(),
    };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setStatus('sending');
    track('message_sent');

    const apiMessages = nextMessages
      .filter(
        (m): m is BotOrUserMsg =>
          m.kind === 'chat' && !m.seeded && (m.role === 'user' || m.role === 'assistant'),
      )
      .map((m) => ({ role: m.role, content: m.text }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          { kind: 'banner', id: id(), variant: 'rate-limit' },
        ]);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const { reply } = (await res.json()) as { reply: string };
      const { text: cleanText, intent } = parseReply(reply);

      const botMsg: BotOrUserMsg = {
        kind: 'chat',
        id: id(),
        role: 'assistant',
        text: cleanText,
        timestamp: now(),
        intent,
      };
      setMessages((prev) => [...prev, botMsg]);

      if (intent?.kind === 'appointment') {
        track('appointment_confirmed', { specialty: intent.specialty });
      } else if (intent?.kind === 'handoff') {
        track('handoff_triggered');
        setHandoffActive(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              kind: 'agent',
              id: id(),
              senderLabel: 'Laura · Clínica Demo',
              text: 'Hola, soy Laura del equipo de Clínica Demo. ¿En qué te puedo ayudar?',
              timestamp: now(),
            },
          ]);
        }, 1500);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { kind: 'banner', id: id(), variant: 'error' },
      ]);
    } finally {
      setStatus('idle');
    }
  }

  function onQuickReply(label: string) {
    track('quick_reply_used', { label });
    void send(label);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const showQuickReplies =
    !handoffActive &&
    status === 'idle' &&
    messages.filter((m) => m.kind === 'chat' && m.role === 'user').length === 0;

  const agentHasResponded = messages.some((m) => m.kind === 'agent');

  return (
    <div className="flex h-full flex-col overflow-hidden bg-wa-chat-bg">
      <Header />

      <div
        ref={scrollRef}
        className="flex-1 space-y-2 overflow-y-auto px-3 py-3"
        aria-live="polite"
      >
        {messages.map((m) => {
          if (m.kind === 'banner') {
            return m.variant === 'rate-limit' ? (
              <div
                key={m.id}
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800"
              >
                Superaste el límite de 15 mensajes por hora. Escribinos al{' '}
                <a
                  href={`tel:${clinic.phone.replace(/\s/g, '')}`}
                  className="font-medium underline"
                >
                  {clinic.phone}
                </a>
                .
              </div>
            ) : (
              <div
                key={m.id}
                className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800"
              >
                Hubo un problema al enviar el mensaje. Probá de nuevo en un ratito.
              </div>
            );
          }
          if (m.kind === 'agent') {
            return (
              <MessageBubble
                key={m.id}
                role="assistant"
                text={m.text}
                timestamp={m.timestamp}
                senderLabel={m.senderLabel}
              />
            );
          }
          return (
            <div key={m.id} className="space-y-2">
              {m.text && (
                <MessageBubble role={m.role} text={m.text} timestamp={m.timestamp} />
              )}
              {m.intent?.kind === 'appointment' && (
                <AppointmentCard
                  specialty={m.intent.specialty}
                  date={m.intent.date}
                  time={m.intent.time}
                />
              )}
            </div>
          );
        })}
        {status === 'sending' && <TypingIndicator />}
        {handoffActive && !agentHasResponded && <HandoffBanner />}
      </div>

      {showQuickReplies && <QuickReplies onSelect={onQuickReply} />}

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-wa-bubble-border bg-white p-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={handoffActive || status === 'sending'}
          placeholder={handoffActive ? 'Chat derivado a un humano' : 'Escribí un mensaje'}
          className="flex-1 rounded-full border border-wa-bubble-border bg-gray-50 px-4 py-2 text-sm outline-none focus-visible:border-wa-accent focus-visible:bg-white disabled:bg-gray-100 disabled:text-gray-400"
          aria-label="Mensaje"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!input.trim() || status === 'sending' || handoffActive}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-accent text-white transition-colors hover:bg-wa-header-dark disabled:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa-accent"
          aria-label="Enviar mensaje"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path d="M2.5 21.5L23 12 2.5 2.5 2.5 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
