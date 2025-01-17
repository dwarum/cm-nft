
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';

import Chat from "../components/chat";

export default function Eliza(){
    const [queryClient] = useState(() => new QueryClient());
      const [query, setQuery] = useState('');
      const [response, setResponse] = useState('');
  return(
     <QueryClientProvider client={queryClient}>
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <section id="introduction" className="flex px-4 py-12 md:pt-24 md:pb-20 w-full justify-center items-center  bg-zinc-300 text-[#191A1C]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <div className="mx-auto pb-12 md:pb-20 space-y-6 text-left">
            <div className="inline-flex items-center gap-3 pb-3">
                <h2 className="bg-clip-text font-nacelle text-black text-3xl font-semibold md:text-4xl">
                    Ask to Earn
                </h2>
            </div>
            <div>
                <p>Start by giving your Date, Time and Location of Birth to know your chart</p>
            </div>
            <Chat/>
          </div>
        </div>
      </section>
    </main>
    </QueryClientProvider>
  )
}


