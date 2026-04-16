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
        className={`relative max-w-[78%] rounded-lg px-3 py-1.5 text-[13.5px] shadow-sm ${
          isUser
            ? 'bubble-tail-right rounded-tr-none bg-wa-user-bubble text-gray-900'
            : 'bubble-tail-left rounded-tl-none border border-wa-bubble-border bg-wa-bot-bubble text-gray-900'
        }`}
      >
        {senderLabel && (
          <p className="mb-0.5 text-[11px] font-semibold text-wa-header">
            {senderLabel}
          </p>
        )}
        <p className="whitespace-pre-wrap leading-[1.35]">{text}</p>
        <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-wa-timestamp">
          <span>{timestamp}</span>
          {isUser && (
            <svg width="16" height="10" viewBox="0 0 16 10" className="text-wa-tick-seen" aria-hidden>
              <path d="M1 5l3 3L11 1" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 5l3 3L15 1" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </p>
      </div>
    </div>
  );
}
