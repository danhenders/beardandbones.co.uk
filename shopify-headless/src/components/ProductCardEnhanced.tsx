'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PRODUCT_PLACEHOLDER } from '@/lib/image-paths';

interface ProductCardProps {
  id: string;
  title: string;
  handle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  image: {
    url: string;
    altText: string | null;
  } | null;
  secondaryImage?: {
    url: string;
    altText: string | null;
  } | null;
  description?: string;
  isAvailable?: boolean;
  isSale?: boolean;
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
}

export default function ProductCardEnhanced({
  id,
  title,
  handle,
  price,
  image,
  secondaryImage,
  description,
  isAvailable = true,
  isSale = false,
  compareAtPrice = null,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(price.amount));
  
  // Format compare at price if available
  const formattedCompareAtPrice = compareAtPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: compareAtPrice.currencyCode,
        minimumFractionDigits: 2,
      }).format(parseFloat(compareAtPrice.amount))
    : null;
  
  // Get image URLs with fallbacks to placeholders
  const primaryImageUrl = image?.url || PRODUCT_PLACEHOLDER;
  const secondaryImageUrl = secondaryImage?.url || primaryImageUrl;
  const imageAlt = image?.altText || title;
  const secondaryImageAlt = secondaryImage?.altText || imageAlt;
  
  return (
    <>
      <Card 
        className="group overflow-hidden border-transparent bg-transparent transition hover:border-white/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative mb-4 aspect-square overflow-hidden">
          {/* Sale badge */}
          {isSale && (
            <div className="absolute left-0 top-0 z-10 bg-error px-3 py-1 font-tenor text-xs uppercase tracking-wider text-white">
              Sale
            </div>
          )}
          
          {/* Sold out badge */}
          {!isAvailable && (
            <div className="absolute left-0 top-0 z-10 bg-dark px-3 py-1 font-tenor text-xs uppercase tracking-wider text-white">
              Sold Out
            </div>
          )}
          
          {/* Product image with hover effect if secondary image exists */}
          <Image 
            src={isHovered && secondaryImage ? secondaryImageUrl : primaryImageUrl}
            alt={isHovered && secondaryImage ? secondaryImageAlt : imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition duration-500 group-hover:scale-105"
          />
          
          {/* Quick shop button on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black bg-opacity-80 p-3 text-center transition duration-300 group-hover:translate-y-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
            >
              Quick Shop
            </Button>
          </div>
        </div>
        
        <CardContent className="p-0">
          {/* Product title */}
          <Link href={`/products/${handle}`}>
            <h3 className="mb-2 font-tenor text-base uppercase tracking-wider text-white transition group-hover:text-accent">
              {title}
            </h3>
          </Link>
          
          {/* Product price */}
          <div className="flex items-center space-x-2">
            {isSale && compareAtPrice ? (
              <>
                <span className="font-twentieth text-base text-error">
                  {formattedPrice}
                </span>
                <span className="font-twentieth text-sm text-white line-through opacity-70">
                  {formattedCompareAtPrice}
                </span>
              </>
            ) : (
              <span className="font-twentieth text-base text-white">
                {formattedPrice}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Quick View Dialog */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description || 'Premium beard care product'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image 
                src={primaryImageUrl}
                alt={imageAlt}
                fill
                className="object-cover object-center"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col">
              <div className="mb-4 flex items-center space-x-2">
                {isSale && compareAtPrice ? (
                  <>
                    <span className="font-twentieth text-xl text-error">
                      {formattedPrice}
                    </span>
                    <span className="font-twentieth text-sm text-white line-through opacity-70">
                      {formattedCompareAtPrice}
                    </span>
                  </>
                ) : (
                  <span className="font-twentieth text-xl text-white">
                    {formattedPrice}
                  </span>
                )}
              </div>
              
              <p className="mb-6 text-white/80">
                {description || 'Premium beard care product handcrafted for the modern gentleman.'}
              </p>
              
              <div className="mt-auto flex space-x-4">
                <Button 
                  variant="default" 
                  className="flex-1"
                  disabled={!isAvailable}
                >
                  {isAvailable ? 'Add to Cart' : 'Sold Out'}
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                >
                  <Link href={`/products/${handle}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 