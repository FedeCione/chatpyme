type Props = {
  onSelect: (label: string) => void;
};

const CHIPS = ['Horarios', 'Especialidades', 'Reservar turno', '¿Atienden obra social?'];

export function QuickReplies({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 px-3 pb-2">
      {CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onSelect(chip)}
          className="rounded-full border border-wa-header bg-white px-3 py-1 text-xs text-wa-header transition-colors hover:bg-wa-header hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa-accent"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
