// src/app/layout.tsx
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Bocarta · Menú digital con QR',
  description:
    'Convierte tu carta en un menú digital vivo: cambia precios, marca agotados y activa promos por horario. Tu QR siempre al día.',
};

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], // ajusta si quieres menos
  variable: '--font-urbanist',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={urbanist.variable}>
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
