/**
 * This file centralizes all image paths used throughout the application.
 * During development, we use placeholder images that will be replaced with actual assets later.
 */

// Placeholder image services
const PLACEHOLDER_BASE = 'https://placehold.co';
const PICSUM_BASE = 'https://picsum.photos';

// Brand Assets
export const LOGO = 'https://cdn.shopify.com/s/files/1/0270/9703/8913/files/13.11_-_shopify_email_logo.png?v=1731495246'; // Real logo from Shopify
export const LOGO_WHITE = `${PLACEHOLDER_BASE}/240x80/000000/FFFFFF?text=Beard+and+Bones`; // Placeholder white logo
export const FAVICON = '/favicon.ico';

// Homepage Assets
export const HERO_IMAGE = 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2062&auto=format&fit=crop'; // Ocean background
export const BRAND_STORY_IMAGE = 'https://images.unsplash.com/photo-1581163898573-c2f62e8344d7?q=80&w=2070&auto=format&fit=crop'; // European street scene with laundry

// Feature Icons (using placeholder colored squares for now)
export const QUALITY_ICON = `${PLACEHOLDER_BASE}/100x100/876447/FFFFFF?text=Quality`;
export const SHIPPING_ICON = `${PLACEHOLDER_BASE}/100x100/876447/FFFFFF?text=Shipping`;
export const PAYMENT_ICON = `${PLACEHOLDER_BASE}/100x100/876447/FFFFFF?text=Payment`;

// About Page Assets
export const FOUNDER_IMAGE = `${PICSUM_BASE}/800/800?random=3`;
export const WORKSHOP_IMAGE = `${PICSUM_BASE}/800/600?random=4`;
export const TEAM_IMAGE = `${PICSUM_BASE}/1200/800?random=5`;

// Background Textures
export const DARK_GRAIN_TEXTURE = '/images/textures/dark-grain.png';
export const PAPER_TEXTURE = '/images/textures/paper-texture.png';

// Social Icons
export const INSTAGRAM_ICON = '/images/social/instagram.svg';
export const FACEBOOK_ICON = '/images/social/facebook.svg';
export const TWITTER_ICON = '/images/social/twitter.svg';

// Collection Placeholders (for when Shopify data isn't available)
export const COLLECTION_PLACEHOLDER = `${PLACEHOLDER_BASE}/800x1000/101010/FFFFFF?text=Collection`;

// Product Placeholders (for when Shopify data isn't available)
export const PRODUCT_PLACEHOLDER = `${PLACEHOLDER_BASE}/800x800/101010/FFFFFF?text=Product`;

/**
 * Helper function to get a product image URL from Shopify data
 * Falls back to placeholder if no image is available
 */
export function getProductImageUrl(product: any): string {
  if (product?.images?.edges?.[0]?.node?.url) {
    return product.images.edges[0].node.url;
  }
  return PRODUCT_PLACEHOLDER;
}

/**
 * Helper function to get a collection image URL from Shopify data
 * Falls back to placeholder if no image is available
 */
export function getCollectionImageUrl(collection: any): string {
  if (collection?.image?.url) {
    return collection.image.url;
  }
  return COLLECTION_PLACEHOLDER;
} 