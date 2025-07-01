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
