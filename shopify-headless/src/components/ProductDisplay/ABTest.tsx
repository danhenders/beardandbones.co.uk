'use client';

import { useEffect, useState } from 'react';
import ProductDisplayA from './ProductDisplayA';
import ProductDisplayB from './ProductDisplayB';

// Add type declaration for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void;
  }
}

interface ProductDisplayProps {
  product: any; // Replace with proper product type
}

export default function ABTestProductDisplay({ product }: ProductDisplayProps) {
  const [variant, setVariant] = useState<string | null>(null);
  
  useEffect(() => {
    // Get the variant from the cookie
    const variantCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('ab-test-variant='));
    
    if (variantCookie) {
      setVariant(variantCookie.split('=')[1]);
    } else {
      // Default to variant A if no cookie exists
      setVariant('variant-a');
    }
    
    // Track the view for analytics
    if (variant) {
      trackView(variant);
    }
  }, [variant]);
  
  // Function to track views for analytics
  const trackView = (variant: string) => {
    // Implement your analytics tracking here
    console.log(`Viewing ${variant}`);
    
    // Example: Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_experiment', {
        'experiment_id': 'product_display',
        'variant_id': variant,
      });
    }
  };
  
  if (!variant) {
    // Loading state or default
    return <ProductDisplayA product={product} />;
  }
  
  // Return the appropriate component based on the variant
  return variant === 'variant-b' 
    ? <ProductDisplayB product={product} /> 
    : <ProductDisplayA product={product} />;
}

// Track conversion events
export function trackConversion(variant: string, event: string) {
  // Implement your conversion tracking here
  console.log(`Conversion: ${event} on ${variant}`);
  
  // Example: Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'experiment_id': 'product_display',
      'variant_id': variant,
      'event_type': event,
    });
  }
} 