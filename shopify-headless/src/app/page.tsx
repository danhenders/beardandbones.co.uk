import Image from "next/image";
import Link from 'next/link';
import { getProducts, getCollections } from '@/lib/shopify';
import { HERO_IMAGE } from '@/lib/image-paths';

// Import components
import Hero from '@/components/Hero';
import FeaturedCollections from '@/components/FeaturedCollections';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';

export default async function Home() {
  // Fetch featured products and collections
  const products = await getProducts();
  const collections = await getCollections();
  
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Collections Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="mb-12 text-center text-lg">
            Explore our premium beard care products designed for the modern gentleman.
          </p>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Home Collection */}
            <div className="group relative aspect-square overflow-hidden border border-white/10">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6 text-center">
                <h3 className="mb-2 font-tenor text-2xl uppercase tracking-wider text-white">
                  HOME PAGE
                </h3>
                <p className="mb-4 text-3xl text-white/70">Collection</p>
                <Link 
                  href="/collections/home"
                  className="mt-4 border border-white bg-transparent px-6 py-2 font-tenor text-sm uppercase tracking-wider text-white transition hover:bg-white/10"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
            
            {/* Beard Care Collection */}
            <div className="group relative aspect-square overflow-hidden border border-white/10">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6 text-center">
                <h3 className="mb-2 font-tenor text-2xl uppercase tracking-wider text-white">
                  BEARD CARE
                </h3>
                <p className="mb-4 text-3xl text-white/70">Collection</p>
                <Link 
                  href="/collections/beard-care"
                  className="mt-4 border border-white bg-transparent px-6 py-2 font-tenor text-sm uppercase tracking-wider text-white transition hover:bg-white/10"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
            
            {/* Accessories Collection */}
            <div className="group relative aspect-square overflow-hidden border border-white/10">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6 text-center">
                <h3 className="mb-2 font-tenor text-2xl uppercase tracking-wider text-white">
                  ACCESSORIES
                </h3>
                <p className="mb-4 text-3xl text-white/70">Collection</p>
                <Link 
                  href="/collections/accessories"
                  className="mt-4 border border-white bg-transparent px-6 py-2 font-tenor text-sm uppercase tracking-wider text-white transition hover:bg-white/10"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/collections"
              className="inline-block border border-white bg-transparent px-8 py-3 font-tenor text-sm uppercase tracking-wider text-white transition hover:bg-white/10"
            >
              VIEW ALL COLLECTIONS
            </Link>
          </div>
        </div>
      </section>
      
      {/* Brand Story */}
      <BrandStory />
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center font-tenor text-3xl uppercase tracking-wider text-white">
            FEATURED PRODUCTS
          </h2>
          <p className="mb-12 text-center text-white/80">
            Our most popular beard care products, handcrafted for the modern gentleman.
          </p>
          
          <div className="mb-8 flex justify-center">
            <div className="border-b border-white/20">
              <button className="border-b-2 border-accent px-6 py-2 font-tenor text-sm uppercase tracking-wider text-white">
                ALL PRODUCTS
              </button>
              <button className="px-6 py-2 font-tenor text-sm uppercase tracking-wider text-white/70 transition hover:text-white">
                BEST SELLERS
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product: any) => (
              <Link 
                key={product.node.id} 
                href={`/products/${product.node.handle}`}
                className="group block"
              >
                <div className="relative mb-4 aspect-square overflow-hidden">
                  {product.node.images.edges[0] && (
                    <Image 
                      src={product.node.images.edges[0].node.url} 
                      alt={product.node.images.edges[0].node.altText || product.node.title}
                      fill
                      className="object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="mb-2 text-center font-tenor text-base uppercase tracking-wider text-white transition group-hover:text-accent">
                  {product.node.title}
                </h3>
                <p className="text-center font-twentieth text-base text-white">
                  ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)} {product.node.priceRange.minVariantPrice.currencyCode}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="bg-[#876447] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-tenor text-3xl uppercase tracking-wider text-white">
            FREE SHIPPING ON ORDERS OVER $50
          </h2>
          <p className="mb-6 font-twentieth text-white/90">
            Plus, get a free sample with every order.
          </p>
          <Link 
            href="/collections/all" 
            className="inline-block border border-white bg-transparent px-8 py-3 font-tenor text-sm uppercase tracking-wider text-white transition hover:bg-white/10"
          >
            SHOP NOW
          </Link>
        </div>
      </section>
      
      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
