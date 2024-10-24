"use client";
// next imports
import Image from "next/image";

// react imports
import { useState, useEffect } from 'react';
import React from 'react';

// solana imports
import { Connection, Transaction, PublicKey, sendAndConfirmTransaction, clusterApiUrl } from '@solana/web3.js';

// solana imports
// plugin imports
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton,useWalletModal } from "@solana/wallet-adapter-react-ui";

// metaplex imports
import { mintV2, mplCandyMachine, fetchCandyMachine, safeFetchCandyGuard, create } from '@metaplex-foundation/mpl-candy-machine';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';

// umi imports
import { dateTime, publicKey, sol } from '@metaplex-foundation/umi';
import { some, generateSigner, transactionBuilder } from "@metaplex-foundation/umi";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';

// das imports
import {dasApi} from '@metaplex-foundation/digital-asset-standard-api';



export default function Home() {
  const { connect, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const {setVisible} = useWalletModal();
  const [nftAddress, setNftAddress] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for image file

  // const candyMachineId = publicKey('2i1AefAX6SFpdbqfUWucEZCrmegxoXZSsFpJeWTPko3E');
  // const collectionMintId = publicKey('y8G3BTR7Fj4xywa5K5DXq3aHhoaCqCJvUuQ9hL6cpb8');
  // const collectionUpdateAuthority = publicKey('A5PcHcK4HEStR3p7VspBLkM8ucqfkyWMQUUHiM4ThQWx');

  const candyMachineId = publicKey('FjALX2yxr7T1yv9ARcW2QDb1kESMHsAsGYM6juiopSGa');
  const collectionMintId = publicKey('B9yJ6fb1eBGzgRwain1iaEw457UZCJVUwz5Uuee6FEVW');
  const collectionUpdateAuthority = publicKey('A5PcHcK4HEStR3p7VspBLkM8ucqfkyWMQUUHiM4ThQWx');

  // stats
  const [itemsAvailable, setItemsAvailable] = useState(0); // Total available NFTs
  const [itemsRedeemed, setItemsRedeemed] = useState(0);   // NFTs minted so far

  // access user's connected wallet
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl('devnet'));

  useEffect(() =>{
    const fetchBalance = async () => {
    if(wallet && !connected){
      connect().catch((err) => console.error("Wallet Connection Failed", err));
    }
    else if(wallet.publicKey && connected){
      try{
        const lamports = await connection.getBalance(wallet.publicKey);
        setBalance(lamports/1e9);
      }
      catch(error){
        console.error('Failed to fetch balance:', error);
        setBalance(null);
      }
    }
  }
  fetchBalance();
},[wallet, connected, connect]);
  
  // initialize umi with Devnet endpoint and connect the user's wallet to umi
  const umi = createUmi(clusterApiUrl('devnet')); 
  umi.use(walletAdapterIdentity(wallet));
  umi.use(mplCandyMachine());
  umi.use(dasApi());

  
  // Function to fetch the Candy Machine state
  const fetchMintStats = async () => {
    try {
      const candyMachine = await fetchCandyMachine(umi, candyMachineId);
      
      console.log("Candy MC", candyMachine);
      // NFTs minted so far
      setItemsAvailable(candyMachine.itemsLoaded);
      setItemsRedeemed(Number(candyMachine.itemsRedeemed));
    } catch (error) {
      console.error('Error fetching mint stats:', error);
    }
  };

  // Poll every 5 seconds to keep stats up to date
  useEffect(() => {
    fetchMintStats();
    const interval = setInterval(fetchMintStats, 10000);
    return () => clearInterval(interval);
  }, []);

  

  // function to mint NFT
  const mint = async () =>{
    
    console.log("mint button clicked");
    if (!wallet.publicKey) {
      setVisible(true);
      return;
    }
    
    try{
      console.log("Fetching Candy Machine and Candy Guard");

      // Fetch the Candy Machine and Candy Guard.
      const candyMachine = await fetchCandyMachine(umi, candyMachineId);
      const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
      console.log("mint auth", candyMachine.mintAuthority);
    
      console.log('Starting NFT mint...');

      // generate a new mint address for the NFT
      const nftMint = generateSigner(umi);

      // build and send transaction
      const tx = await transactionBuilder()
      .add(setComputeUnitLimit(umi, { units: 800_000 }))
      .add(
        mintV2(umi, {
          candyMachine: candyMachineId,
          candyGuard: candyGuard?.publicKey,
          nftMint,
          collectionMint: collectionMintId,
          collectionUpdateAuthority: collectionUpdateAuthority,
          tokenStandard: 0, //nft
          mintArgs: {
            solPayment: some({ destination: collectionUpdateAuthority }),
        },
        })
      )
      .sendAndConfirm(umi,{confirm:{commitment: "confirmed"}});

      console.log('Mint successful! Transaction ID:', tx);
      console.log('NFT Mint Address:', nftMint.publicKey);
    }
    catch(error){
      console.log("Minting failed:", error);
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
        {connected && wallet.publicKey ? (
        <div className="flex items-center gap-2" >
          <WalletMultiButton/>
          <span style={{color: '#512da8', fontWeight: 'bold'}}>
           {balance !== null ? `${balance.toFixed(2)} SOL` : '0 SOL'} 
          </span>
        </div>
      ) : (
        <WalletMultiButton />
      )}
          </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>

          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            rel="noopener noreferrer"
            onClick={mint}
          >
           {connected ? 'MINT' : 'CONNECT WALLET'}
          </button>
          <p>
            {itemsRedeemed} / {itemsAvailable} NFTs minted
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
