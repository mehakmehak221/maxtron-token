import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MAXTRON — The Shield Token | Tokenomics',
  description:
    'Explore MAXTRON, the utility and compliance token powering The Shield Framework for secure real-world asset tokenization.',
  keywords: ['MAXTRON', 'Shield Token', 'RWA', 'tokenomics', 'real estate', 'blockchain'],
  openGraph: {
    title: 'MAXTRON — The Shield Token',
    description:
      'The utility and compliance token powering the next generation of real-world asset tokenization.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: 'var(--font-inter, system-ui), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
