# Image Assets Documentation

This document provides a comprehensive list of all image assets used throughout the Beard and Bones headless Shopify store. It distinguishes between Shopify-hosted images (product/collection images) and local UI assets that need to be stored in the `/public/images` directory.

## Shopify-Hosted Images

These images are stored on Shopify's CDN and accessed through the Storefront API. No local storage is required.

### Product Images
Product images are automatically fetched from Shopify when using the `getProducts()` or `getProduct()` functions:

```typescript
// Example product image URL structure from Shopify
// https://cdn.shopify.com/s/files/1/0123/4567/8901/products/product-image.jpg
```

### Collection Images
Collection images are automatically fetched from Shopify when using the `getCollections()` function:

```typescript
// Example collection image URL structure from Shopify
// https://cdn.shopify.com/s/files/1/0123/4567/8901/collections/collection-image.jpg
```

## Local UI Assets

These images need to be stored in the `/public/images` directory of the project. They are used for UI elements and branding.

### Brand Assets
- **Logo**: `/images/logo.png` - Main logo used in header and footer
- **Logo (White)**: `/images/logo-white.png` - White version of logo for dark backgrounds
- **Favicon**: `/favicon.ico` - Browser tab icon

### Homepage Assets
- **Hero Background**: `/images/hero-image.jpg` - Main hero section background
- **Brand Story Image**: `/images/brand-story.jpg` - Image for the "Our Story" section
- **Feature Icons**:
  - `/images/icons/quality-icon.svg` - Premium quality icon
  - `/images/icons/shipping-icon.svg` - Fast shipping icon
  - `/images/icons/payment-icon.svg` - Secure payment icon

### About Page Assets
- **Founder Image**: `/images/founder.jpg` - Image of the company founder
- **Workshop Image**: `/images/workshop.jpg` - Image of the production workshop
- **Team Image**: `/images/team.jpg` - Team photo

### UI Elements
- **Background Textures**:
  - `/images/textures/dark-grain.png` - Subtle texture for dark sections
  - `/images/textures/paper-texture.png` - Paper-like texture for light sections
- **Social Icons**:
  - `/images/social/instagram.svg`
  - `/images/social/facebook.svg`
  - `/images/social/twitter.svg`

## Centralized Image Path Management

To simplify image management, we use a centralized file for all image paths. This makes it easy to update image paths in one place and ensures consistency across the application.

### Using the Image Paths Module

The `src/lib/image-paths.ts` file exports constants and helper functions for all images used in the application:

```typescript
// Import image paths
import { HERO_IMAGE, BRAND_STORY_IMAGE } from '@/lib/image-paths';

// Use in components
<Image 
  src={HERO_IMAGE} 
  alt="Hero image"
  fill
/>
```

### Helper Functions

The module also provides helper functions to handle Shopify images with fallbacks:

```typescript
// For product images
import { getProductImageUrl } from '@/lib/image-paths';

const imageUrl = getProductImageUrl(product);

// For collection images
import { getCollectionImageUrl } from '@/lib/image-paths';

const imageUrl = getCollectionImageUrl(collection);
```

## Placeholder Images

During development, we use placeholder images from these services:

- [Placeholder.com](https://placeholder.com/) - e.g., `https://via.placeholder.com/800x600`
- [Picsum Photos](https://picsum.photos/) - e.g., `https://picsum.photos/800/600`

These are configured in the `image-paths.ts` file and will be replaced with actual assets later.

## Image Replacement Guide

When replacing placeholder images with actual assets:

1. For Shopify-hosted images (products/collections), update the products in the Shopify admin
2. For local UI assets, add the images to the corresponding paths in the `/public/images` directory
3. Update the `image-paths.ts` file to point to the new assets

## Image Optimization Notes

- All local images are served through Next.js's Image component for optimization
- Shopify-hosted images are already optimized through Shopify's CDN
- Consider using WebP format for better performance where possible
- Recommended dimensions:
  - Hero image: 1920×1080px
  - Product thumbnails: 800×800px
  - Logo: 240×80px 