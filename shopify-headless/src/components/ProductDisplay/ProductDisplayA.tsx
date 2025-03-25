'use client';

import { useState } from 'react';
import Image from 'next/image';
import { trackConversion } from './ABTest';

interface ProductDisplayProps {
  product: any; // Replace with proper product type
}

export default function ProductDisplayA({ product }: ProductDisplayProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0]?.node || null);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Adding to cart:', {
      product,
      variant: selectedVariant,
      quantity,
    });
    
    // Track conversion
    trackConversion('variant-a', 'add_to_cart');
  };
  
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product Images */}
      <div className="relative aspect-square overflow-hidden">
        {product.images.edges[0] && (
          <Image 
            src={product.images.edges[0].node.url} 
            alt={product.images.edges[0].node.altText || product.title}
            fill
            priority
            className="object-cover object-center"
          />
        )}
      </div>
      
      {/* Product Info */}
      <div className="flex flex-col">
        <h1 className="mb-2 font-tenor text-3xl uppercase tracking-wider text-white">
          {product.title}
        </h1>
        
        <div className="mb-4">
          <p className="font-twentieth text-2xl text-white">
            ${parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)} {product.priceRange.minVariantPrice.currencyCode}
          </p>
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
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
        
        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="mb-2 block font-tenor text-sm uppercase tracking-wider text-white">
            Quantity
          </label>
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
        </div>
        
        {/* Add to Cart Button */}
        <button
          className="bg-accent px-8 py-4 font-tenor text-sm uppercase tracking-wider text-white transition hover:bg-accent/90"
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale}
        >
          {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
} 