'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 1000);
    
    // In a real implementation, you would call your newsletter API here
    // try {
    //   const response = await fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    //   });
    //   const data = await response.json();
    //   
    //   if (response.ok) {
    //     setStatus('success');
    //     setMessage(data.message || 'Thank you for subscribing!');
    //     setEmail('');
    //   } else {
    //     setStatus('error');
    //     setMessage(data.message || 'Something went wrong. Please try again.');
    //   }
    // } catch (error) {
    //   setStatus('error');
    //   setMessage('Something went wrong. Please try again.');
    // }
  };
  
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-tenor text-3xl uppercase tracking-wider text-white">
            JOIN OUR NEWSLETTER
          </h2>
          <p className="mb-8 font-twentieth text-white/80">
            Subscribe to get special offers, free giveaways, and beard care tips delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="w-full bg-black border border-white/30 px-4 py-3 font-twentieth text-white placeholder:text-white/50 focus:outline-none"
                disabled={status === 'loading'}
                required
              />
              <Button 
                type="submit" 
                disabled={status === 'loading'}
                className="whitespace-nowrap bg-[#876447] hover:bg-[#876447]/90 border-none"
              >
                {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </Button>
            </div>
            
            {message && (
              <p className={`mt-4 text-sm ${status === 'error' ? 'text-error' : 'text-accent'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
} 