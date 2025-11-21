import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import { ThemeProvider } from './components/theme/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dustin Tech Hub',
  description: '/',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
