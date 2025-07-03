'use client'
import { useWallet } from '@solana/wallet-adapter-react'

export default function WalletButton() {
  const { connect, connected } = useWallet()
  
  return (
    <button 
      onClick={() => connect()}
      className="w-full sm:w-auto rounded-lg px-6 py-2 border-2 border-cyan-400 bg-gray-900 hover:bg-cyan-950 transition font-bold shadow-md"
    >
      {connected ? 'Connected' : 'Connect Wallet'}
    </button>
  )
}