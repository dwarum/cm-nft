// app/components/WalletContextProvider.tsx
"use client"; // Mark as client-side component

import { ReactNode, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { LedgerWalletAdapter } from '@solana/wallet-adapter-wallets';
//import { GlowWalletAdapter } from 'glow-wallet-adapter'; - TO-DO
import { clusterApiUrl } from '@solana/web3.js';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css'; // Import styles for the wallet modal UI

export default function WalletContextProvider({ children }: { children: ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter()
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
