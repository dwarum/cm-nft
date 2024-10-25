"use client";
// next imports
import Image from "next/image";

// react imports
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import {toast} from 'react-toastify';
import Confetti from 'react-confetti';

//style imports
require('./mint.css'); 

// solana imports
import { Connection, Transaction, PublicKey, sendAndConfirmTransaction, clusterApiUrl, TransactionMessage } from '@solana/web3.js';
import bs58 from 'bs58';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton,useWalletModal } from "@solana/wallet-adapter-react-ui";

// metaplex imports
import { mintV2, mplCandyMachine, fetchCandyMachine, safeFetchCandyGuard, create } from '@metaplex-foundation/mpl-candy-machine';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';

// umi imports
import { dateTime, publicKey, sol } from '@metaplex-foundation/umi';
import { isSome, some, generateSigner, transactionBuilder } from "@metaplex-foundation/umi";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';

// das imports
import {dasApi} from '@metaplex-foundation/digital-asset-standard-api';

export default function Home() { 
  const { connect, connected } = useWallet();
  const {setVisible} = useWalletModal();
  const [balance, setBalance] = useState<number | null>(null);
  const [minting, setMinting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [nftPrice, setNftPrice] = useState(0);// Example: 0.2 SOL
  const [botTax, setBotTax] = useState(0); // Example: 0.01 SOL
  const [networkFee, setNetworkFee] = useState(0); // Example: 0.005 SOL
  const [mintClosed, setMintClosed] = useState(false); // Track mint status
  const [error, setError] = useState<string | null>(null);

  const estimatedCost = (nftPrice + botTax + networkFee).toFixed(6);
  
  const [nftAddress, setNftAddress] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for image file

  // Candy Guard Id: 9qwfkWfdnq7Tvc9DQn4L4yveBbjSxPCc1WnVYjwMvXup

  const candyMachineId = publicKey('ct4ZXaeZ4kymr29VWFKZXFgJkqP6NfRYvuDREQ3gEBT');
  const collectionMintId = publicKey('DLLUzHTc513Y4prryh5JKuHC2CzhXUB65RoZa9qqQNWH');
  const collectionUpdateAuthority = publicKey('A5PcHcK4HEStR3p7VspBLkM8ucqfkyWMQUUHiM4ThQWx');

  // stats
  const [itemsAvailable, setItemsAvailable] = useState(0); // Total available NFTs
  const [itemsRedeemed, setItemsRedeemed] = useState(0);   // NFTs minted so far

  // access user's connected wallet
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl('devnet'));

  //variable to store toast messages
  let toastId: any;
  
  // initialize umi with Devnet endpoint and connect the user's wallet to umi
  const umi = createUmi(clusterApiUrl('devnet')); 
  umi.use(walletAdapterIdentity(wallet));
  umi.use(mplCandyMachine());
  umi.use(dasApi());


  const fetchBalance = useCallback(async() =>{

    if(wallet && !connected){
      try {
        await connect(); // Connect the wallet if not connected
        console.log('Wallet connected.');
      } catch (error) {
        console.error('Wallet connection failed:', error);
        toast.error('Failed to connect wallet.');
        return; // Exit if connection fails
      }
    }
    if(wallet.publicKey && connected){
      try{
        const lamports = await connection.getBalance(wallet.publicKey);
        setBalance(lamports/1e9);
      }
      catch(error){
        console.error('Failed to fetch balance:', error);
        setBalance(null);
        toast.error('Failed to update wallet balance.');
      }
    }
  },[wallet, connected, connect, wallet.publicKey]);

  useEffect(() => {
    fetchBalance(); // call fetchBalance on wallet change
  }, [fetchBalance]);

  // Function to fetch the Candy Machine state
  const fetchMintStats = useCallback(async () => {
    try {
      const candyMachine = await fetchCandyMachine(umi, candyMachineId);
      
      //console.log("Candy MC", candyMachine);
      // NFTs minted so far
      setItemsAvailable(candyMachine.itemsLoaded);
      setItemsRedeemed(Number(candyMachine.itemsRedeemed));

      // Check if all NFTs are minted
      if (candyMachine.itemsRedeemed >= candyMachine.itemsLoaded) {
        setMintClosed(true); // Disable minting
      }

    } catch (error) {
      console.error('Error fetching mint stats:', error);
    }
  },[umi, candyMachineId]);

  // Poll every 10 seconds to keep stats up to date
  useEffect(() => {
    fetchMintStats();
    const interval = setInterval(fetchMintStats, 10000);
    return () => clearInterval(interval);
  }, [fetchMintStats]);

  // Function to fetch Mint Details
  useEffect(()=>{
    const fetchFees = async () =>{
      const {nftPrice, botTax} = await fetchCandyData();
      setNftPrice(nftPrice);
      setBotTax(botTax);

      if(wallet.publicKey){
       const networkFee = await fetchNetworkFee(wallet.publicKey!);
       setNetworkFee(networkFee);
      }
    }
    fetchFees();
  },[wallet.publicKey]);

  const fetchCandyData = async () => {
    try {
      // Fetch the Candy Machine and Candy Guard once
      const candyMachine = await fetchCandyMachine(umi, candyMachineId);
      if (!candyMachine) throw new Error('Candy Machine not found');
  
      const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
      if (!candyGuard) throw new Error('Candy Guard not found or unauthorized');
  
      console.log('Fetched Candy Machine and Candy Guard:', candyMachine, candyGuard);
  
      // Extract NFT Price (from solPayment)
      const solPayment = candyGuard?.guards.solPayment;
      const nftPrice = isSome(solPayment) ?  Number(solPayment.value.lamports.basisPoints) / 1e9 : 0; // Convert to SOL
  
      // Extract Mint Fee (from botTax)
      const botTaxFee = candyGuard?.guards.botTax;
      const botTax = isSome(botTaxFee) ? Number(botTaxFee.value.lamports.basisPoints) / 1e9 : 0; // Convert to SOL
  
      return { nftPrice, botTax };
    } catch (error) {
      console.error('Error fetching candy data:', error);
      return { nftPrice: 0, botTax: 0 };
    }
  };

  const fetchNetworkFee = async (walletPublicKey: PublicKey) => {
    try {
      // Create an empty transaction (or replace with your actual minting instructions)
      const transaction = new Transaction();
  
      // Add recent blockhash to the transaction (required)
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
  
      // Set the fee payer (the wallet initiating the transaction)
      transaction.feePayer = walletPublicKey;
  
      // Get the estimated fee in lamports
    const feeInLamports = await connection.getFeeForMessage(transaction.compileMessage());

    // Convert to SOL and keep more decimal places
    const feeInSOL = (feeInLamports.value! / 1e9);

    return feeInSOL;
    } catch (error) {
      console.error('Error fetching network fee:', error);
      return 0;
    }
  };
  

  // Call this function after mint success
  const handleMintSuccess = async (transactionSignature:any) => {
    try {
      // Use `connection.confirmTransaction()` to ensure the transaction is finalized
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        { signature: transactionSignature, ...latestBlockhash },
        'finalized' // Wait for finalization
      );
  
      console.log('Transaction confirmed! Fetching updated balance...');

      // Fetch the updated balance and refresh mint stats after confirmation
      await fetchBalance(); 
      await fetchMintStats();

    } catch (error) {
      console.error('Error confirming transaction:', error);
      // Update the toast to show mint success message
        toast.update(toastId, {
          render: 'Failed to confirm transaction. Please try again',
          type: 'error',
          autoClose: 2000, // Auto-close after 2 seconds
        });
    }
  };

  // handle mint
  const handleMint = async () =>{
    // open wallet modal if not connected
    if (!wallet.publicKey) {
      setVisible(true); 
      return;
    }
    // prevent multiple clicks
    if (minting || mintClosed) return; 
    
    try{
      // start minting
      setMinting(true); 

      // Check if wallet has enough balance
      //const balance = await fetchBalance();
      if (balance && balance < parseFloat(estimatedCost)) {
        toast.error(`Insufficient balance! You need at least ${estimatedCost} SOL to mint.`);
        return;
      }

      // Show a toast with minting in progress message
      toastId = toast.info('Minting in progress...', { autoClose: false });

      const { transactionSignature, mintAddress } = await mint();  //call mint function

      // show confetti, success toast 
      if(transactionSignature && mintAddress) {
        // Update the existing toast to show confirmation message
        toast.update(toastId, {
          render: 'Confirming transaction...',
          type: 'info',
          autoClose: false, // Keep it open until confirmation completes
        });

        // confirm transaction and fetch updated balance
        await handleMintSuccess(transactionSignature);

        // Update the toast to show mint success message
        toast.update(toastId, {
          render: 'Mint successful! Check your wallet.',
          type: 'success',
          autoClose: 5000, // Auto-close after 5 seconds
        });

        setShowConfetti(true);
        // stop confetti after 5 seconds and open wallet url
        setTimeout(() => {
          setShowConfetti(false); 
          openWallet(mintAddress);
        },3000); 
      }
      else{
        // Update the toast to show mint success message
        toast.update(toastId, {
          render: 'Mint failed. Please try again',
          type: 'error',
          autoClose: 1000, // Auto-close after 2 seconds
        });
      }
    }
    catch (error:any) {
      console.error('Mint failed:', error);
      let toastMessage = 'Mint failed. Please try again'

      if (error.message.includes('MissingRemainingAccount')) {
        toastMessage = 'All NFTs have been minted. Mints are now closed';
        setMintClosed(true); // Disable further minting attempts
      }
      // Update the toast to show the error message
      toast.update(toastId, {
        render: toastMessage,
        type: 'error', // Use string type instead of toast.TYPE.ERROR
        autoClose: 1000, // Auto-close after 5 seconds
      });
    }
    finally{
      setMinting(false);
    }
  };
  // Open Phantom Wallet URL (Triggered directly from button click)
  const openWallet = (mintAddress:any) => {
    const walletName = wallet?.wallet?.adapter?.name.toLowerCase(); // Detect connected wallet
      let walletUrl;
      if (walletName?.includes('phantom')) {
        walletUrl = `https://phantom.app/ul/browse/mint/${mintAddress}`;
      } else if (walletName?.includes('solflare')) {
        walletUrl = `https://solflare.com/nft/${mintAddress}`;
      } else {
        toast.info('Please check your wallet for the minted NFT.');
        return;
      }

    window.open(walletUrl, '_blank'); // Open in a new tab
  };

  // function to mint NFT
  const mint = async () =>{
    try{
      console.log("Fetching Candy Machine and Candy Guard");

      // Fetch the Candy Machine and Candy Guard.
      const candyMachine = await fetchCandyMachine(umi, candyMachineId);
      if (!candyMachine) {
        throw new Error('Candy Machine not found');
      }

      const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
      if (!candyGuard) {
        throw new Error('Candy Guard not found or unauthorized');
      }
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

      console.log('NFT Mint Address:', nftMint.publicKey);
      await fetchMintStats();
      return {transactionSignature: bs58.encode(tx.signature), mintAddress: nftMint.publicKey};
    }
    catch(error: any){
      // Enhanced error handling with specific messages
    if (error.message.includes('Candy Machine not found')) {
      console.error('Error: Failed to fetch Candy Machine. Please try again later.');
    } else if (error.message.includes('Candy Guard not found')) {
      console.error('Error: Candy Guard could not be fetched. Ensure it is correctly configured.');
    } else if (error.message.includes('Network request failed')) {
      console.error('Network error: Please check your internet connection.');
    } else {
      console.error('Minting failed:', error);
    }
    return {transactionSignature: null, mintAddress: null};
  }
    }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

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
          <div className="mint-section">
            {/**fee details */}
            <div className="mint-details">
              <div className="detail-row">
                <span>Total Minted:</span><span>{itemsRedeemed} / {itemsAvailable} </span>
              </div>
              <div className="detail-row">
                <span>NFT Price:</span> <span>{nftPrice} SOL</span>
              </div>
              <div className="detail-row">
                <span>Bot Tax:</span> <span>{botTax} SOL</span>
              </div>
              <div className="detail-row">
                <span>Network Fee:</span> <span>{networkFee} SOL</span>
              </div>
              <div className="detail-row total-fee">
                <strong>Estimated Cost:</strong> 
                <strong>{estimatedCost} SOL</strong>
              </div>
            </div>
            {/**confetti */}
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
            {/** Mint Button  */}
            <button onClick={handleMint} className="mint-button" disabled={minting || mintClosed}>
            {mintClosed ? 'MINTS CLOSED' : connected ? 'MINT' : 'CONNECT WALLET'}
            </button>
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
