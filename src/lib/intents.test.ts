import { describe, expect, it } from 'vitest';
import { parseAssistantResponse } from './intents';

describe('parseAssistantResponse', () => {
  it('parses a valid appointment response', () => {
    const raw = JSON.stringify({
      reply: 'Listo, te agendo el turno.',
      intent: {
        kind: 'appointment',
        specialty: 'Clínica Médica',
        date: '2026-05-25',
        time: '14:00',
      },
    });

    expect(parseAssistantResponse(raw)).toEqual({
      text: 'Listo, te agendo el turno.',
      intent: {
        kind: 'appointment',
        specialty: 'Clínica Médica',
        date: '2026-05-25',
        time: '14:00',
      },
    });
  });

  it('parses a valid handoff response', () => {
    const raw = JSON.stringify({
      reply: 'Te derivo con una persona del equipo.',
      intent: { kind: 'handoff' },
    });

    expect(parseAssistantResponse(raw)).toEqual({
      text: 'Te derivo con una persona del equipo.',
      intent: { kind: 'handoff' },
    });
  });

  it('returns text only when intent is null', () => {
    const raw = JSON.stringify({
      reply: 'Atendemos de lunes a viernes de 9 a 18 h.',
      intent: null,
    });

    expect(parseAssistantResponse(raw)).toEqual({
      text: 'Atendemos de lunes a viernes de 9 a 18 h.',
    });
  });

  it('returns text only when intent is absent', () => {
    const raw = JSON.stringify({ reply: '¡Hola! ¿En qué te ayudo?' });

    expect(parseAssistantResponse(raw)).toEqual({
      text: '¡Hola! ¿En qué te ayudo?',
    });
  });

  it('drops a malformed intent but keeps the reply', () => {
    const raw = JSON.stringify({
      reply: 'Confirmame la fecha y te agendo.',
      intent: { kind: 'appointment', specialty: 'Clínica Médica', date: 'mañana' },
    });

    expect(parseAssistantResponse(raw)).toEqual({
      text: 'Confirmame la fecha y te agendo.',
    });
  });

  it('drops an intent with an unknown kind but keeps the reply', () => {
    const raw = JSON.stringify({
      reply: 'Algo raro pasó.',
      intent: { kind: 'cancel' },
    });

    expect(parseAssistantResponse(raw)).toEqual({ text: 'Algo raro pasó.' });
  });

  it('trims surrounding whitespace from the reply', () => {
    const raw = JSON.stringify({ reply: '  Hola  ' });

    expect(parseAssistantResponse(raw)).toEqual({ text: 'Hola' });
  });

  it('returns null when the payload is not valid JSON', () => {
    expect(parseAssistantResponse('not json at all')).toBeNull();
  });

  it('returns null when there is no usable reply', () => {
    expect(parseAssistantResponse(JSON.stringify({ intent: { kind: 'handoff' } }))).toBeNull();
    expect(parseAssistantResponse(JSON.stringify({ reply: '   ' }))).toBeNull();
  });
});
