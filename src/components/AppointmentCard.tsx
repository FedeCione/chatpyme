type Props = {
  specialty: string;
  date: string;
  time: string;
};

function formatDate(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(d);
}

export function AppointmentCard({ specialty, date, time }: Props) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-lg border border-wa-bubble-border bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-wa-accent text-white">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4L8.5 12l6.8-6.7a1 1 0 011.4 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-900">Turno reservado</p>
        </div>
        <dl className="mt-2 space-y-0.5 text-sm text-gray-700">
          <div className="flex gap-2">
            <dt className="w-24 font-medium text-gray-500">Especialidad</dt>
            <dd className="capitalize">{specialty}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 font-medium text-gray-500">Fecha</dt>
            <dd className="capitalize">{formatDate(date)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 font-medium text-gray-500">Hora</dt>
            <dd>{time} hs</dd>
          </div>
        </dl>
        <p className="mt-2 text-[10px] italic text-gray-500">
          Demo — sin calendario real
        </p>
      </div>
    </div>
  );
}
