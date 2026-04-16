export function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-label="El asistente está escribiendo">
      <div className="flex items-center gap-1 rounded-lg border border-wa-bubble-border bg-wa-bot-bubble px-3 py-2 shadow-sm">
        {[0, 0.15, 0.3].map((delay) => (
          <span
            key={delay}
            className="wa-typing-dot block h-1.5 w-1.5 rounded-full bg-gray-400"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  );
}
