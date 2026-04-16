import { Chatbot } from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 md:p-6">
      <p className="mb-4 hidden text-center text-sm text-gray-600 md:block">
        Demo pública · Construido por{' '}
        <a
          href="https://fedecione.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-wa-header hover:underline"
        >
          Federico Cione
        </a>{' '}
        ·{' '}
        <a
          href="https://github.com/fedecione/chatpyme"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-wa-header hover:underline"
        >
          Código en GitHub
        </a>
      </p>
      <div className="h-[100dvh] w-full overflow-hidden bg-wa-chat-bg md:h-[720px] md:w-[380px] md:rounded-[28px] md:border-[10px] md:border-gray-900 md:shadow-2xl">
        <Chatbot />
      </div>
      <p className="w-full border-t border-gray-200 bg-white px-4 py-2 text-center text-xs text-gray-600 md:hidden">
        Demo por{' '}
        <a href="https://fedecione.dev" className="font-medium text-wa-header">
          fedecione.dev
        </a>
      </p>
    </main>
  );
}
