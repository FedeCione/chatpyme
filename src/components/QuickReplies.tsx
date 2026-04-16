type Props = {
  onSelect: (label: string) => void;
};

const CHIPS = [
  'Horarios',
  'Especialidades',
  'Reservar turno',
  '¿Atienden obra social?',
];

export function QuickReplies({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5 bg-wa-input-bg px-3 pb-2 pt-2">
      {CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onSelect(chip)}
          className="chip-glow rounded-full border border-wa-header/30 bg-white px-3.5 py-1.5 text-xs font-medium text-wa-header transition-all hover:border-wa-header hover:bg-wa-header hover:text-white active:scale-95"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
