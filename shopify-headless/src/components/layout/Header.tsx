'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGO } from '@/lib/image-paths';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-black py-3 shadow-md' : 'bg-[#2c3e50] py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6 text-white"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-[80px] w-[150px]">
            <Image 
              src={LOGO} 
              alt="Beard and Bones" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {['SHOP', 'COLLECTIONS', 'ABOUT', 'BLOG'].map((item) => (
              <li key={item}>
                <Link 
                  href={`/${item.toLowerCase()}`} 
                  className="font-tenor text-sm uppercase tracking-wider text-white transition hover:text-accent"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Cart and Account */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button 
            className="text-white transition hover:text-accent"
            aria-label="Search"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Account */}
          <Link 
            href="/account" 
            className="text-white transition hover:text-accent"
            aria-label="Account"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          
          {/* Cart */}
          <Link 
            href="/cart" 
            className="flex items-center text-white transition hover:text-accent"
            aria-label="Cart"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="ml-1 text-xs">(0)</span>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-50 bg-black transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="container mx-auto p-4">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <div className="relative h-[80px] w-[150px]">
                <Image 
                  src={LOGO} 
                  alt="Beard and Bones" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Link>
            
            <button 
              className="text-white"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav>
            <ul className="space-y-6">
              {['SHOP', 'COLLECTIONS', 'ABOUT', 'BLOG'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="block font-tenor text-xl uppercase tracking-wider text-white transition hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-8 border-t border-white/20 pt-8">
            <div className="space-y-6">
              <Link 
                href="/account" 
                className="flex items-center font-tenor text-base uppercase tracking-wider text-white transition hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="mr-3 h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Account
              </Link>
              
              <Link 
                href="/cart" 
                className="flex items-center font-tenor text-base uppercase tracking-wider text-white transition hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="mr-3 h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Cart (0)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 