import { clinic } from '@/data/clinic';

export function Header() {
  return (
    <header className="flex items-center gap-3 bg-wa-header px-4 py-3 text-white shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-accent text-sm font-semibold text-white">
        CD
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold leading-tight">{clinic.name}</p>
        <p className="text-xs text-white/80">en línea</p>
      </div>
    </header>
  );
}
