# A/B Testing Implementation

This document outlines the A/B testing implementation for the Beard and Bones headless Shopify store.

## Overview

The A/B testing system allows us to test different UI variations to determine which performs better in terms of user engagement and conversion rates. The implementation uses Vercel Edge Functions and middleware to assign users to test groups and track their interactions.

## Current A/B Tests

### Product Display Test

We are currently running an A/B test on the product display page with two variants:

- **Variant A**: Standard layout with product image on the left and product details on the right.
- **Variant B**: Enhanced layout with product title at the top, thumbnail gallery, and additional product features section.

## Technical Implementation

### Components

1. **ABTestProductDisplay**: The main component that conditionally renders either ProductDisplayA or ProductDisplayB based on the assigned variant.
2. **ProductDisplayA**: The first variant of the product display.
3. **ProductDisplayB**: The second variant of the product display with an enhanced layout.

### Middleware

The middleware (`src/middleware.ts`) handles:

1. Checking if a user already has a variant assigned via cookies
2. If not, fetching the A/B test configuration from Vercel Edge Config
3. Assigning a variant based on configured weights (defaulting to 50/50 if not configured)
4. Setting a cookie to ensure consistent experience across page loads

### Edge Config

The Edge Config utility (`src/lib/edge-config.ts`) provides functions to:

1. Fetch A/B test configurations
2. Retrieve feature flags
3. Check if specific features are enabled

### Analytics Tracking

The A/B test implementation includes tracking for:

1. **View events**: Tracked when a user views a specific variant
2. **Conversion events**: Tracked when a user performs a desired action (e.g., adding to cart)

These events are sent to Google Analytics for analysis.

## Configuration

A/B tests can be configured through Vercel Edge Config. The configuration includes:

```json
{
  "productDisplay": {
    "enabled": true,
    "variantAWeight": 50,
    "variantBWeight": 50
  }
}
```

## Adding New A/B Tests

To add a new A/B test:

1. Create the variant components
2. Update the middleware to handle the new test
3. Add the new test configuration to Edge Config
4. Implement tracking for the new test

## Analyzing Results

Results can be analyzed through:

1. Google Analytics conversion tracking
2. Custom dashboard (to be implemented)
3. Vercel Analytics

## Best Practices

1. Keep variants focused on testing specific hypotheses
2. Ensure consistent user experience across page loads
3. Track meaningful metrics that align with business goals
4. Run tests for sufficient time to gather statistically significant data
5. Document test results and learnings 