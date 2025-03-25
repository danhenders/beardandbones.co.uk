'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BRAND_STORY_IMAGE } from '@/lib/image-paths';

interface BrandStoryProps {
  imageSrc?: string; // Make this optional since we have a default
}

export default function BrandStory({ imageSrc = BRAND_STORY_IMAGE }: BrandStoryProps = {}) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image 
              src={imageSrc} 
              alt="Beard and Bones Story" 
              fill
              className="object-cover object-center"
            />
          </div>
          
          {/* Content */}
          <div>
            <h2 className="mb-6 font-tenor text-3xl uppercase tracking-wider text-white">
              OUR STORY
            </h2>
            <div className="space-y-4 font-twentieth text-white/80">
              <p>
                Beard and Bones was born from a simple belief: that every man deserves quality grooming products that work as hard as they do.
              </p>
              <p>
                Founded in 2018 by two bearded friends frustrated with the lack of effective beard care products, we set out to create formulations that actually deliver results—using only the finest natural ingredients.
              </p>
              <p>
                Each product is handcrafted in small batches in our London workshop, ensuring the highest quality and attention to detail. We never use harsh chemicals, synthetic fragrances, or animal testing.
              </p>
              <p>
                From our signature beard oils to our premium grooming kits, every Beard and Bones product is designed to help you look and feel your best.
              </p>
            </div>
            <div className="mt-8">
              <Button 
                asChild 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/pages/about-us">
                  LEARN MORE ABOUT US
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 