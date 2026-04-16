# ChatPyME — demo de chatbot WhatsApp con IA

Demo público de un chatbot con IA diseñado para PyMEs argentinas. El bot actúa como recepcionista virtual de una clínica ficticia: responde consultas, agenda turnos y deriva a un humano cuando es necesario.

**Stack**: Next.js 16 · Groq (Llama 3.3 70B) · Zod v4 · Tailwind CSS v4 · Vercel Analytics

## Cómo probarlo

```bash
pnpm install
cp .env.local.example .env.local
# Completá GROQ_API_KEY con tu key de https://console.groq.com/keys
pnpm dev
# Abrí http://localhost:3000
```

Sin `GROQ_API_KEY` el bot responde con un placeholder `[DEMO MODE]`.

## Cómo retargetearlo para tu negocio

Editá un solo archivo: `src/data/clinic.ts`. Cambiá nombre, dirección, teléfono, horarios, especialidades y obras sociales. El system prompt y el bot se reconfiguran automáticamente.

## Cómo se conecta a WhatsApp Business Cloud API en producción

En la demo el chat es una UI web que imita WhatsApp. En producción el flujo es:

```
Usuario envía mensaje por WhatsApp
  → Meta entrega un webhook POST /webhook/whatsapp
  → Tu servidor verifica la firma HMAC del payload
  → Extrae messages[0].text.body
  → Llama al mismo endpoint /api/chat con el historial
  → Recibe la respuesta del bot
  → POST https://graph.facebook.com/v19.0/{phone-id}/messages
    con el reply como texto
  → El usuario recibe la respuesta en su WhatsApp
```

Eso es lo que entrega el servicio pago: la integración con Meta, la verificación de firma, el manejo de sesiones y el deploy en infraestructura real. La demo prueba que el cerebro del bot funciona.

## Estructura

```
src/
  app/
    api/chat/route.ts   — validación, rate limit, llamada a Groq
    page.tsx             — phone-frame wrapper
    layout.tsx           — metadata, fonts, analytics
    globals.css          — Tailwind v4 @theme (paleta WhatsApp)
  components/
    Chatbot.tsx          — orquestador de estado y fetch
    Header.tsx           — barra verde con avatar y "en línea"
    MessageBubble.tsx    — burbuja usuario/bot con timestamp
    TypingIndicator.tsx  — tres puntos animados
    QuickReplies.tsx     — chips de respuesta rápida
    AppointmentCard.tsx  — card de turno confirmado
    HandoffBanner.tsx    — aviso de derivación a humano
  data/
    clinic.ts            — datos de la clínica (fuente de verdad)
  lib/
    clinicPrompt.ts      — system prompt + buildMessages()
    intents.ts           — parser de [INTENT:*] tokens
```

## Autor

**Federico Cione** — Backend Engineer · IA & Automatización

- Portfolio: [fedecione.dev](https://fedecione-portfolio.vercel.app)
- GitHub: [github.com/fedecione](https://github.com/fedecione)

## Licencia

MIT
