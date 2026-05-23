import { z } from 'zod/v4';

const appointmentIntentSchema = z.object({
  kind: z.literal('appointment'),
  specialty: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

const handoffIntentSchema = z.object({
  kind: z.literal('handoff'),
});

const intentSchema = z.discriminatedUnion('kind', [
  appointmentIntentSchema,
  handoffIntentSchema,
]);

const assistantResponseSchema = z.object({
  reply: z.string().trim().min(1),
  intent: z.unknown().optional(),
});

export type ParsedIntent = z.infer<typeof intentSchema>;

/**
 * Validates the model's JSON-mode output against the response schema.
 *
 * The model is asked (via the system prompt) to return a single JSON object
 * `{ reply, intent }`. We trust nothing: the raw string is JSON-parsed and the
 * shape is validated with Zod. A malformed intent is dropped without losing the
 * reply; an unusable reply (or invalid JSON) yields `null` so the caller can
 * surface an error instead of rendering garbage.
 */
export function parseAssistantResponse(
  raw: string,
): { text: string; intent?: ParsedIntent } | null {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }

  const base = assistantResponseSchema.safeParse(json);
  if (!base.success) return null;

  const text = base.data.reply.trim();

  const intent = intentSchema.safeParse(base.data.intent);
  return intent.success ? { text, intent: intent.data } : { text };
}
