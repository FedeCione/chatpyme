export function HandoffBanner() {
  return (
    <div className="flex justify-center py-1">
      <div className="inline-flex items-center gap-2 rounded-lg bg-wa-header/10 px-4 py-2 shadow-sm backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
        </span>
        <span className="text-xs font-medium text-wa-header">
          Derivando a un asesor humano…
        </span>
      </div>
    </div>
  );
}
