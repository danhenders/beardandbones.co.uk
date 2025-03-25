'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProductCardEnhanced from './ProductCardEnhanced';
import { getProductImageUrl } from '@/lib/image-paths';

interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    }
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      }
    }>
  };
  availableForSale?: boolean;
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  tags?: string[];
}

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedProducts({
  products,
  title = "Featured Products",
  subtitle = "Our most popular beard care products, handcrafted for the modern gentleman.",
}: FeaturedProductsProps) {
  // Group products by tags for tabs
  const bestSellers = products.filter(product => product.tags?.includes('best-seller'));
  const newArrivals = products.filter(product => product.tags?.includes('new-arrival'));
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-tenor text-3xl uppercase tracking-wider text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-3xl font-twentieth text-white/80">
              {subtitle}
            </p>
          )}
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              {bestSellers.length > 0 && (
                <TabsTrigger value="best-sellers">Best Sellers</TabsTrigger>
              )}
              {newArrivals.length > 0 && (
                <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
              )}
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <ProductCardEnhanced
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  handle={product.handle}
                  price={product.priceRange.minVariantPrice}
                  image={product.images.edges[0]?.node || null}
                  secondaryImage={product.images.edges[1]?.node || null}
                  description={product.description}
                  isAvailable={product.availableForSale !== false}
                  compareAtPrice={product.compareAtPrice}
                />
              ))}
            </div>
          </TabsContent>
          
          {bestSellers.length > 0 && (
            <TabsContent value="best-sellers" className="mt-6">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {bestSellers.slice(0, 8).map((product) => (
                  <ProductCardEnhanced
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    handle={product.handle}
                    price={product.priceRange.minVariantPrice}
                    image={product.images.edges[0]?.node || null}
                    secondaryImage={product.images.edges[1]?.node || null}
                    description={product.description}
                    isAvailable={product.availableForSale !== false}
                    compareAtPrice={product.compareAtPrice}
                  />
                ))}
              </div>
            </TabsContent>
          )}
          
          {newArrivals.length > 0 && (
            <TabsContent value="new-arrivals" className="mt-6">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {newArrivals.slice(0, 8).map((product) => (
                  <ProductCardEnhanced
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    handle={product.handle}
                    price={product.priceRange.minVariantPrice}
                    image={product.images.edges[0]?.node || null}
                    secondaryImage={product.images.edges[1]?.node || null}
                    description={product.description}
                    isAvailable={product.availableForSale !== false}
                    compareAtPrice={product.compareAtPrice}
                  />
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 