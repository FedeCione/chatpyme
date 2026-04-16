import { Chatbot } from '@/components/Chatbot';

function StatusBar() {
  return (
    <div className="flex items-center justify-between bg-wa-header px-5 pb-1 pt-2.5 text-[10px] font-medium text-white/90">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.5" opacity="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" opacity="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" opacity="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" opacity="0.35" />
        </svg>
        {/* WiFi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
          <path
            d="M7 9.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM3.8 6.3a4.5 4.5 0 016.4 0"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M1.5 4a7.3 7.3 0 0111 0"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* Battery */}
        <svg width="22" height="10" viewBox="0 0 22 10" fill="currentColor">
          <rect
            x="0.5"
            y="0.5"
            width="18"
            height="9"
            rx="2"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <rect x="2" y="2" width="12" height="6" rx="1" fill="currentColor" />
          <rect x="19.5" y="3" width="2" height="4" rx="0.5" />
        </svg>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div className="flex justify-center bg-wa-header pb-1">
      <div className="h-[22px] w-[90px] rounded-full bg-black" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-wa-chat-bg md:showcase-bg md:p-8">
      {/* Desktop top bar */}
      <div className="mb-5 hidden text-center md:block">
        <h2 className="mb-1 text-sm font-semibold text-wa-header">ChatPyME</h2>
        <p className="text-xs text-wa-header/50">
          Demo publica ·{' '}
          <a
            href="https://fedecione-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-wa-header/60 transition-colors hover:text-wa-header"
          >
            Federico Cione
          </a>
          {' · '}
          <a
            href="https://github.com/fedecione/chatpyme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-wa-header/60 transition-colors hover:text-wa-header"
          >
            GitHub
          </a>
        </p>
      </div>

      {/* Phone frame */}
      <div className="relative h-[100dvh] w-full overflow-hidden bg-black md:h-[780px] md:w-[380px] md:rounded-[44px] md:border-[8px] md:border-gray-800 md:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
        {/* Notch + status bar (desktop only) */}
        <div className="hidden md:block">
          <DynamicIsland />
          <StatusBar />
        </div>

        {/* Chat */}
        <div className="h-full md:h-[calc(100%-52px)]">
          <Chatbot />
        </div>
      </div>

      {/* Mobile footer */}
      <p className="w-full border-t border-gray-200 bg-white px-4 py-2 text-center text-xs text-gray-500 md:hidden">
        Demo por{' '}
        <a
          href="https://fedecione-portfolio.vercel.app"
          className="font-medium text-wa-header"
        >
          fedecione.dev
        </a>
      </p>

      {/* Desktop CTA */}
      <div className="mt-5 hidden text-center md:block">
        <a
          href="https://fedecione-portfolio.vercel.app#contact"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-wa-header/20 bg-white/60 px-5 py-2 text-xs font-medium text-wa-header shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md"
        >
          Queres un chatbot asi para tu negocio? →
        </a>
      </div>
    </main>
  );
}
