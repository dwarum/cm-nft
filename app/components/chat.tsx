'use client';

import { useState, useEffect, useRef } from 'react';
import useSendMessage from './hooks/useSendMessage';

export default function Chat(){
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{user: string; bot: string}[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  
  //const sendMessage = useSendMessage();
  const {mutate: sendMessage, isPending } = useSendMessage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(()=>{
    scrollToBottom();
  }, [messages]);

  // Fetch agentId when the component mounts
  useEffect(()=>{
    const fetchAgent = async () =>{
      try{
          const res = await fetch('http://localhost:3000/agents');
          if(!res.ok){
            throw new Error(`Failed to fetch agents: ${res.statusText}`);
          }

          const data = await res.json();
          const firstAgent = data.agents[0];
          setAgentId(firstAgent.id);
          console.log('Agent: ', firstAgent.id);
      }
      catch(error){
          console.error('Error fetching agent: ', error);
      }
    };

    fetchAgent();
  },[]);

  const handleSendMessage = async () => {
    if(!input.trim() || !agentId) {
      console.error('Missing input or agentId');
      return;
    }

    const userMessage = input;
    setMessages((prev)=>[...prev,{user:userMessage, bot:""}]);
    setInput('');

    sendMessage(
      { text: userMessage, agentId },
      {
        onSuccess: (data) =>{
          setMessages((prev) => 
                    prev.map((msg,idx) => 
                      idx === prev.length - 1 ? {...msg, bot: data[0]?.text || 'No response'} : msg ));
          
        },
        onError:(error) =>{
          console.error('Error sending message: ', error);
          setMessages((prev) => 
                    prev.map((msg,idx)=>
                      idx === prev.length - 1 ? { ...msg, bot: 'Error fetching response'} : msg));
        }   
      }
    );
    setInput('');
  };
  return(
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, idx) => (
          <div key={idx} className="mb-4">
            
             {/* User Message */}
             {message.user && (
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-md">
                  {message.user}
                </div>
              </div>
            )}

            {/* Bot Response */}
            {message.bot && (
              <div className="flex justify-start mt-2">
                <div className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg max-w-md">
                  {message.bot}
                </div>
              </div>
            )}

          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-300">
        <div className="flex items-center space-x-4">
          <textarea
            className="flex-grow border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring focus:ring-blue-500"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          ></textarea>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            {'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
