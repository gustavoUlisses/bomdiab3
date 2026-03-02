import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Trader Generation B3 Hub',
  description: 'Sistema integrado de gestão de risco e simuladores para traders da B3.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="font-sans bg-zinc-950 text-zinc-50 antialiased selection:bg-emerald-500/30">
        {children}
      </body>
    </html>
  );
}
