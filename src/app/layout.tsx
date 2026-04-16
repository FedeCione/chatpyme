import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ChatPyME — demo de chatbot WhatsApp con IA',
  description:
    'Demo público de un chatbot con IA para PyMEs: reserva de turnos, derivación a humano y respuestas en tono argentino. Construido en un fin de semana por Federico Cione.',
  openGraph: {
    title: 'ChatPyME — demo de chatbot WhatsApp con IA',
    description: 'Chatbot demo para una clínica: agenda turnos, deriva a humano, responde en rioplatense.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-gray-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
