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
      <div className="max-w-[85%] overflow-hidden rounded-lg border border-wa-bubble-border bg-white shadow-sm">
        {/* Green accent bar */}
        <div className="h-1 bg-gradient-to-r from-wa-accent to-wa-header-dark" />

        <div className="p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wa-accent/10">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-wa-accent"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4L8.5 12l6.8-6.7a1 1 0 011.4 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              Turno reservado
            </p>
          </div>
          <dl className="mt-2.5 space-y-1 text-[13px]">
            <div className="flex gap-2">
              <dt className="w-24 text-gray-400">Especialidad</dt>
              <dd className="font-medium capitalize text-gray-800">
                {specialty}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 text-gray-400">Fecha</dt>
              <dd className="font-medium capitalize text-gray-800">
                {formatDate(date)}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 text-gray-400">Hora</dt>
              <dd className="font-medium text-gray-800">{time} hs</dd>
            </div>
          </dl>
          <p className="mt-2.5 border-t border-gray-100 pt-2 text-[10px] text-gray-400">
            Demo — sin calendario real
          </p>
        </div>
      </div>
    </div>
  );
}
