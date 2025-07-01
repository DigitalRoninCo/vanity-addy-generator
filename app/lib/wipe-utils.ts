import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

// Program ID of the on-chain wipe program
const PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgE9DuAyY29S');

// Minimal IDL describing the wipe instruction
const IDL = {
  version: '0.1.0',
  name: 'vanity_addy',
  instructions: [
    {
      name: 'storeWipeProof',
      accounts: [
        { name: 'target', isMut: true, isSigner: false }
      ],
      args: [
        { name: 'method', type: 'u8' }
      ]
    }
  ]
};

/**
 * Invoke the on-chain wipe program to record a wipe event for the current wallet.
 * @param userId Identifier of the user being wiped. Only used for logging.
 */
export async function initiateWipe(userId: string) {
  console.log(`Wipe initiated for ${userId}`);

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
  // Wipe method 0 represents a NIST clear in this demo
  const txSignature = await program.methods
    .storeWipeProof(0)
    .accounts({ target: provider.wallet.publicKey })
    .rpc();

  return { txSignature };
}
