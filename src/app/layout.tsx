import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import Providers from '@/context/providers';
import { Toaster } from 'sonner';
import Timer from '@/components/timer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Study Timer App',
  description: 'Gerencie seu tempo de estudo com eficiência!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Providers>
          <main className='flex flex-col items-center justify-center min-h-screen p-24'>
            {children}
            <Timer />
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
