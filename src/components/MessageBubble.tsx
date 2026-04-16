type Props = {
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  senderLabel?: string;
};

export function MessageBubble({ role, text, timestamp, senderLabel }: Props) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[78%] rounded-lg px-3 py-2 text-sm shadow-sm ${
          isUser
            ? 'bg-wa-user-bubble text-gray-900'
            : 'border border-wa-bubble-border bg-wa-bot-bubble text-gray-900'
        }`}
      >
        {senderLabel && (
          <p className="mb-0.5 text-[11px] font-semibold text-wa-header">{senderLabel}</p>
        )}
        <p className="whitespace-pre-wrap leading-snug">{text}</p>
        <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-wa-timestamp">
          <span>{timestamp}</span>
          {isUser && <span className="text-wa-tick-seen">✓✓</span>}
        </p>
      </div>
    </div>
  );
}
