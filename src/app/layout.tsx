import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'ChatPyME — demo de chatbot WhatsApp con IA',
  description:
    'Demo publica de un chatbot con IA para PyMEs: reserva de turnos, derivacion a humano y respuestas en tono argentino. Construido en un fin de semana por Federico Cione.',
  openGraph: {
    title: 'ChatPyME — demo de chatbot WhatsApp con IA',
    description:
      'Chatbot demo para una clinica: agenda turnos, deriva a humano, responde en rioplatense.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'ChatPyME — demo de chatbot WhatsApp con IA',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
