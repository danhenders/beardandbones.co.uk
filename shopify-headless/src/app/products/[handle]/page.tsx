'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProduct } from '@/lib/shopify';
import ABTestProductDisplay from '@/components/ProductDisplay/ABTest';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProductPage() {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        
        if (typeof handle !== 'string') {
          throw new Error('Invalid product handle');
        }
        
        const productData = await getProduct(handle);
        
        if (!productData) {
          throw new Error('Product not found');
        }
        
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    if (handle) {
      fetchProduct();
    }
  }, [handle]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 font-tenor text-2xl text-white">Error</h1>
        <p className="text-white">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 font-tenor text-2xl text-white">Product Not Found</h1>
        <p className="text-white">The requested product could not be found.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      <ABTestProductDisplay product={product} />
      
      {/* Related Products Section */}
      {product.collections?.edges?.length > 0 && (
        <div className="mt-16 border-t border-white/20 pt-16">
          <h2 className="mb-8 text-center font-tenor text-2xl uppercase tracking-wider text-white">
            You May Also Like
          </h2>
          {/* Related products would be rendered here */}
        </div>
      )}
    </main>
  );
} 