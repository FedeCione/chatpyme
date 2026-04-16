import { clinic } from '@/data/clinic';

export function Header() {
  return (
    <header className="flex items-center gap-3 bg-gradient-to-b from-wa-header to-wa-header-light px-4 py-2.5 text-white shadow-md">
      {/* Avatar */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wa-accent to-wa-header-dark shadow-inner">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white" aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v-4h4v-2h-4V6h-2v4H7v2h4v4z" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-semibold leading-tight">
            {clinic.name}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-wa-accent shadow-[0_0_4px_rgba(37,211,102,0.6)]" />
          <p className="text-[11px] text-white/70">en linea</p>
        </div>
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white/60" aria-hidden>
          <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white/60" aria-hidden>
          <circle cx="12" cy="6" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        </svg>
      </div>
    </header>
  );
}
