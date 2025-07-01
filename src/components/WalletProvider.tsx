'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextValue {
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);

  async function connect() {
    const provider = (window as any)?.solana;
    if (provider?.connect) {
      const res = await provider.connect();
      const key = res?.publicKey?.toString() ?? null;
      setPublicKey(key);
    }
  }

  function disconnect() {
    const provider = (window as any)?.solana;
    if (provider?.disconnect) {
      provider.disconnect();
    }
    setPublicKey(null);
  }

  return (
    <WalletContext.Provider value={{ publicKey, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
