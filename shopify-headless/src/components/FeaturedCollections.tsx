'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCollectionImageUrl } from '@/lib/image-paths';

interface Collection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: {
    url: string;
    altText: string | null;
  } | null;
}

interface FeaturedCollectionsProps {
  collections: Collection[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedCollections({
  collections,
  title = "Shop Our Collections",
  subtitle = "Explore our premium beard care products designed for the modern gentleman.",
}: FeaturedCollectionsProps) {
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
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Card 
              key={collection.id}
              className="group overflow-hidden border-white/10 bg-transparent transition hover:border-white/30"
            >
              <Link href={`/collections/${collection.handle}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* Use our helper function to get the image URL or fallback to placeholder */}
                  <Image 
                    src={getCollectionImageUrl(collection)}
                    alt={collection.image?.altText || collection.title}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  
                  {/* Collection title overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 p-6 transition group-hover:bg-opacity-50">
                    <div className="text-center">
                      <h3 className="mb-2 font-tenor text-2xl uppercase tracking-wider text-white">
                        {collection.title}
                      </h3>
                      {collection.description && (
                        <p className="mb-4 hidden font-twentieth text-sm text-white/90 md:block">
                          {collection.description.length > 100 
                            ? `${collection.description.substring(0, 100)}...` 
                            : collection.description}
                        </p>
                      )}
                      <Button variant="outline" size="sm" className="mt-2">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/collections">
              View All Collections
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 