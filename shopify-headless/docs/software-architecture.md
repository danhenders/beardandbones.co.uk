# Software Architecture

## System Overview

The headless Shopify architecture for beardandbones.co.uk separates the frontend presentation layer from the backend commerce functionality. This document outlines the technical architecture of the system.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Next.js App    │────▶│  Shopify API    │────▶│  Shopify Admin  │
│  (Frontend)     │◀────│  (Middleware)   │◀────│  (Backend)      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                                               │
        │                                               │
        ▼                                               ▼
┌─────────────────┐                           ┌─────────────────┐
│                 │                           │                 │
│  Vercel         │                           │  Shopify Data   │
│  (Hosting)      │                           │  (Products,     │
│                 │                           │   Orders, etc.) │
└─────────────────┘                           └─────────────────┘
```

## Component Architecture

### Frontend (Next.js)

The frontend is built using Next.js with the App Router architecture, which provides server components, client components, and data fetching capabilities.

#### Directory Structure

```
/src
  /app                  # Next.js App Router
    /api                # API routes
    /(routes)           # Application routes
      /products         # Product pages
      /collections      # Collection pages
      /account          # Account pages
      /cart             # Cart page
    /layout.tsx         # Root layout
    /page.tsx           # Homepage
  /components           # Reusable components
    /ui                 # UI components
    /layout             # Layout components
    /product            # Product-related components
    /cart               # Cart-related components
    /checkout           # Checkout components
  /lib                  # Utility functions
    /shopify.ts         # Shopify API client
    /hooks              # Custom React hooks
    /utils              # Helper functions
  /types                # TypeScript type definitions
  /styles               # Global styles
  /public               # Static assets
```

### Data Flow Architecture

1. **Server Components**:
   - Fetch data directly from Shopify API
   - Render HTML on the server
   - Send fully rendered HTML to the client

2. **Client Components**:
   - Handle interactive elements
   - Manage client-side state
   - Make API calls for dynamic data

3. **API Routes**:
   - Handle authenticated requests to Shopify
   - Process form submissions
   - Manage cart operations

## Integration Points

### Shopify Storefront API

The primary integration point with Shopify is through the Storefront API, which provides access to:
- Products and collections
- Customer information
- Cart and checkout functionality
- Metafields and custom data

### Authentication Flow

1. Customer authentication is handled through Shopify Customer Accounts
2. JWT tokens are used for maintaining session state
3. Account information is fetched from Shopify API

### Cart Management

1. Cart is created and managed through Shopify Storefront API
2. Cart state is maintained in browser storage (localStorage)
3. Cart operations (add, update, remove) are processed through API routes

### Checkout Process

1. Cart is prepared with all necessary information
2. Customer is redirected to Shopify Checkout
3. After checkout completion, customer is redirected back to the storefront

## Caching Strategy

1. **Static Generation**:
   - Homepage, collection pages, and static content are generated at build time
   - Revalidated on a schedule or on-demand

2. **Incremental Static Regeneration (ISR)**:
   - Product pages use ISR to stay fresh while maintaining performance
   - Configurable revalidation periods based on content type

3. **Client-side Caching**:
   - SWR/React Query for client-side data fetching with caching
   - Service Worker for offline capabilities and asset caching

## Deployment Architecture

1. **CI/CD Pipeline**:
   - GitHub repository for version control
   - Automated testing on pull requests
   - Vercel preview deployments for review

2. **Environment Strategy**:
   - Development environment connected to Shopify development store
   - Staging environment for pre-production testing
   - Production environment connected to live Shopify store

3. **Monitoring and Logging**:
   - Vercel Analytics for performance monitoring
   - Error tracking with Sentry
   - Custom logging for business-critical operations 