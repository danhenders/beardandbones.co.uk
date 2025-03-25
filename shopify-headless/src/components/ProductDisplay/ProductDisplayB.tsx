'use client';

import { useState } from 'react';
import Image from 'next/image';
import { trackConversion } from './ABTest';

interface ProductDisplayProps {
  product: any; // Replace with proper product type
}

export default function ProductDisplayB({ product }: ProductDisplayProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0]?.node || null);
  const [selectedImage, setSelectedImage] = useState(product.images.edges[0]?.node || null);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Adding to cart:', {
      product,
      variant: selectedVariant,
      quantity,
    });
    
    // Track conversion
    trackConversion('variant-b', 'add_to_cart');
  };
  
  return (
    <div className="flex flex-col gap-8">
      {/* Product Title and Price - Moved to top for variant B */}
      <div className="text-center">
        <h1 className="mb-2 font-tenor text-4xl uppercase tracking-wider text-white">
          {product.title}
        </h1>
        <p className="font-twentieth text-2xl text-accent">
          ${parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)} {product.priceRange.minVariantPrice.currencyCode}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Thumbnail Gallery - New in variant B */}
        <div className="hidden md:col-span-1 md:flex md:flex-col md:gap-4">
          {product.images.edges.map(({ node }: any, index: number) => (
            <button
              key={node.id}
              className={`relative aspect-square overflow-hidden border-2 ${
                selectedImage?.id === node.id ? 'border-accent' : 'border-transparent'
              }`}
              onClick={() => setSelectedImage(node)}
            >
              <Image 
                src={node.url} 
                alt={node.altText || `Product image ${index + 1}`}
                fill
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
        
        {/* Main Product Image */}
        <div className="relative aspect-square overflow-hidden md:col-span-6">
          {selectedImage && (
            <Image 
              src={selectedImage.url} 
              alt={selectedImage.altText || product.title}
              fill
              priority
              className="object-cover object-center"
            />
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col md:col-span-5">
          {/* Mobile Carousel for Images */}
          <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
            {product.images.edges.map(({ node }: any, index: number) => (
              <button
                key={node.id}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border-2 ${
                  selectedImage?.id === node.id ? 'border-accent' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(node)}
              >
                <Image 
                  src={node.url} 
                  alt={node.altText || `Product image ${index + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>
          
          <div className="mb-6 font-twentieth text-white" 
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
          />
          
          {/* Variant Selector */}
          {product.variants.edges.length > 1 && (
            <div className="mb-6">
              <label className="mb-2 block font-tenor text-sm uppercase tracking-wider text-white">
                Select Option
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.edges.map(({ node }: any) => (
                  <button
                    key={node.id}
                    className={`border px-4 py-2 font-twentieth text-sm transition ${
                      selectedVariant?.id === node.id
                        ? 'border-accent bg-accent text-white'
                        : 'border-white bg-transparent text-white hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedVariant(node)}
                  >
                    {node.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity and Add to Cart in a row */}
          <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-32">
              <button
                className="flex h-full w-12 items-center justify-center border border-white bg-transparent text-white transition hover:bg-white/10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="flex h-full w-12 items-center justify-center border-y border-white bg-transparent font-twentieth text-white">
                {quantity}
              </div>
              <button
                className="flex h-full w-12 items-center justify-center border border-white bg-transparent text-white transition hover:bg-white/10"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <button
              className="flex-1 bg-accent px-8 py-4 font-tenor text-sm uppercase tracking-wider text-white transition hover:bg-accent/90"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </button>
          </div>
          
          {/* Additional Product Features - New in variant B */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
            <div className="text-center">
              <div className="mb-2 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xs text-white">Premium Quality</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs text-white">Fast Shipping</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <p className="text-xs text-white">Secure Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 