
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { WalletProvider } from '../components/WalletProvider';
import React, { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vanity Address Generator',
  description: 'Search for custom Solana addresses'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>{children}</WalletProvider>
      </body>
=======
import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Vanity Address Generator',
  description: 'Generate Solana vanity addresses',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>

    </html>
  );
}
