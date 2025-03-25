import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getABTestConfig } from './lib/edge-config';

// The percentage of users to include in the experiment
const EXPERIMENT_PERCENTAGE = 50;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Only run A/B tests on product pages
  if (request.nextUrl.pathname.startsWith('/products/')) {
    // Check if user already has a variant assigned
    const abTestCookie = request.cookies.get('product-display-variant');
    
    if (!abTestCookie) {
      // Get A/B test config from Edge Config
      const abTestConfig = await getABTestConfig();
      
      // Determine which variant to show based on configured weights
      // Default to 50/50 split if config is unavailable
      let variantAWeight = 50; // Default to 50% if config is unavailable
      
      // Use the config value if available
      if (abTestConfig && typeof abTestConfig === 'object' && 'productDisplay' in abTestConfig) {
        const productDisplay = abTestConfig.productDisplay as Record<string, any>;
        if (productDisplay && typeof productDisplay.variantAWeight === 'number') {
          variantAWeight = productDisplay.variantAWeight;
        }
      }
      
      const random = Math.random() * 100;
      const variant = random < variantAWeight ? 'variant-a' : 'variant-b';
      
      // Set the cookie with a 30-day expiration
      response.cookies.set({
        name: 'product-display-variant',
        value: variant,
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
      });
    }
  }
  
  return response;
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    // Match all product pages
    '/products/:path*',
    // Match the homepage for potential future A/B tests
    '/',
  ],
}; 