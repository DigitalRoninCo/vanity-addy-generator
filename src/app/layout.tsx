import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { WalletProvider } from '../components/WalletProvider';
import React, { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vanity Address Generator',
  description: 'Generate Solana vanity addresses',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
