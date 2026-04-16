export function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-label="El asistente está escribiendo">
      <div className="bubble-tail-left relative rounded-lg rounded-tl-none border border-wa-bubble-border bg-wa-bot-bubble px-3.5 py-2.5 shadow-sm">
        <div className="flex items-center gap-[5px]">
          {[0, 0.15, 0.3].map((delay) => (
            <span
              key={delay}
              className="wa-typing-dot block h-[7px] w-[7px] rounded-full bg-wa-timestamp"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
