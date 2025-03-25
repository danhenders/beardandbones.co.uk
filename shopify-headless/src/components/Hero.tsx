'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HERO_IMAGE } from '@/lib/image-paths';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  overlayOpacity?: number;
}

export default function Hero({
  title = "PREMIUM BEARD CARE PRODUCTS",
  subtitle = "Handcrafted grooming essentials for the modern gentleman. Made with the finest natural ingredients.",
  ctaText = "SHOP NOW",
  ctaLink = "/collections/all",
  secondaryCtaText = "LEARN MORE",
  secondaryCtaLink = "/pages/about-us",
  imageSrc = HERO_IMAGE,
  imageAlt = "Beard and Bones - Premium Beard Care Products",
  overlayOpacity = 0.4,
}: HeroProps) {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={imageSrc} 
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-tenor text-5xl uppercase tracking-wider text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl font-twentieth text-lg text-white/90 md:text-xl">
            {subtitle}
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button 
              asChild 
              size="lg"
              className="bg-[#876447] hover:bg-[#876447]/90 px-8 py-4"
            >
              <Link href={ctaLink}>
                {ctaText}
              </Link>
            </Button>
            
            {secondaryCtaText && secondaryCtaLink && (
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4"
              >
                <Link href={secondaryCtaLink}>
                  {secondaryCtaText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 