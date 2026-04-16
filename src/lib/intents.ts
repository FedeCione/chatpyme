import { z } from 'zod/v4';

const appointmentSchema = z.object({
  specialty: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

export type ParsedIntent =
  | { kind: 'appointment'; specialty: string; date: string; time: string }
  | { kind: 'handoff' };

const APPOINTMENT_RE = /\n?\[INTENT:APPOINTMENT\](\{[^}]*\})/;
const HANDOFF_RE = /\n?\[INTENT:HANDOFF\]/;

export function parseReply(raw: string): { text: string; intent?: ParsedIntent } {
  let text = raw;
  let intent: ParsedIntent | undefined;

  const apptMatch = text.match(APPOINTMENT_RE);
  if (apptMatch) {
    try {
      const parsed = appointmentSchema.safeParse(JSON.parse(apptMatch[1]));
      if (parsed.success) {
        intent = { kind: 'appointment', ...parsed.data };
      }
    } catch {
      // Drop the intent; keep the cleaned text.
    }
    text = text.replace(APPOINTMENT_RE, '');
  }

  if (HANDOFF_RE.test(text)) {
    if (!intent) intent = { kind: 'handoff' };
    text = text.replace(HANDOFF_RE, '');
  }

  text = text.trim();
  return intent ? { text, intent } : { text };
}
