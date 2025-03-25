'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from '@/components/ui/expandable-chat';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ShopifyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! I\'m your Beard and Bones assistant. How can I help you today? You can ask me about your orders, shipping, account information, or product recommendations.',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }
      
      const data = await response.json();
      
      // Add assistant response to chat
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chatbot communication:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please try again later.',
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Bearded Robot Icon component
  const BeardedRobotIcon = () => (
    <div className="relative w-full h-full">
      <Image 
        src="/images/bearded-robot-detailed.svg" 
        alt="Bearded Robot" 
        fill 
        className="object-contain"
        priority
      />
    </div>
  );
  
  // Smaller version for the header
  const BeardedRobotIconSmall = () => (
    <div className="relative h-12 w-12">
      <Image 
        src="/images/bearded-robot-detailed.svg" 
        alt="Bearded Robot" 
        fill 
        className="object-contain"
        priority
      />
    </div>
  );
  
  return (
    <ExpandableChat 
      position="bottom-right" 
      size="md"
      icon={<BeardedRobotIcon />}
      buttonLabel="AI ASSISTANT"
    >
      <ExpandableChatHeader className="bg-[#2c3e50] text-white">
        <div className="flex items-center">
          <div className="mr-3">
            <BeardedRobotIconSmall />
          </div>
          <h3 className="font-tenor text-lg uppercase tracking-wider">
            Beard & Bones AI
          </h3>
        </div>
      </ExpandableChatHeader>
      
      <ExpandableChatBody className="bg-white p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] flex-col rounded-lg px-4 py-2",
                message.role === 'user'
                  ? "ml-auto bg-accent text-white"
                  : "bg-gray-100 text-black"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <span className="mt-1 text-right text-xs opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-max max-w-[80%] flex-col rounded-lg bg-gray-100 px-4 py-2 text-black">
              <p className="text-sm">Thinking...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ExpandableChatBody>
      
      <ExpandableChatFooter className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-md border border-gray-300 bg-white p-2 text-black placeholder:text-gray-500 focus:border-accent focus:outline-none"
            rows={1}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="h-10 w-10 rounded-full p-0 bg-accent hover:bg-accent/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
} 