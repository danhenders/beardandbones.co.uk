import { createClient } from '@vercel/edge-config';

// Create a mock edge config for local development
const mockEdgeConfig = {
  get: async (key: string) => {
    // Default values for local development
    const defaults: Record<string, any> = {
      'ab-test-config': {
        enabled: true,
        percentage: 50,
        variants: ['variant-a', 'variant-b'],
        productDisplay: {
          variantAWeight: 50
        }
      },
      'feature-flags': {
        newCheckout: false,
        enhancedSearch: true
      }
    };
    
    return defaults[key] || null;
  }
};

// Use Vercel Edge Config in production, mock in development
export const edgeConfig = process.env.VERCEL 
  ? createClient(process.env.EDGE_CONFIG_ID || '')
  : mockEdgeConfig;

export async function getABTestConfig() {
  try {
    return await edgeConfig.get('ab-test-config') as {
      enabled: boolean;
      percentage: number;
      variants: string[];
      productDisplay?: {
        variantAWeight: number;
      };
    };
  } catch (error) {
    console.error('Failed to fetch A/B test config:', error);
    return {
      enabled: false,
      percentage: 50,
      variants: ['variant-a'],
      productDisplay: {
        variantAWeight: 50
      }
    };
  }
}

export async function getFeatureFlags() {
  try {
    return await edgeConfig.get('feature-flags') as Record<string, boolean>;
  } catch (error) {
    console.error('Failed to fetch feature flags:', error);
    return {};
  }
}

export async function isFeatureEnabled(featureName: string): Promise<boolean> {
  try {
    const featureFlags = await getFeatureFlags();
    return !!featureFlags[featureName];
  } catch (error) {
    console.error(`Failed to check if feature ${featureName} is enabled:`, error);
    return false;
  }
} 