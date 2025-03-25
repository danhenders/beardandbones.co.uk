'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  isAvailable?: boolean;
  isSale?: boolean;
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
}

export default function ProductCard({
  id,
  title,
  handle,
  price,
  image,
  secondaryImage,
  isAvailable = true,
  isSale = false,
  compareAtPrice = null,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  return (
    <Link 
      href={`/products/${handle}`}
      className="group block"
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
        {image && (
          <Image 
            src={isHovered && secondaryImage ? secondaryImage.url : image.url}
            alt={isHovered && secondaryImage && secondaryImage.altText ? secondaryImage.altText : image.altText || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition duration-500 group-hover:scale-105"
          />
        )}
        
        {/* Quick shop button on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black bg-opacity-80 p-3 text-center transition duration-300 group-hover:translate-y-0">
          <span className="font-tenor text-xs uppercase tracking-wider text-white">
            Quick Shop
          </span>
        </div>
      </div>
      
      {/* Product title */}
      <h3 className="mb-2 font-tenor text-base uppercase tracking-wider text-white transition group-hover:text-accent">
        {title}
      </h3>
      
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
    </Link>
  );
} 