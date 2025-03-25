// Define the Shopify Storefront API endpoint and headers
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN || '';
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2023-10';
const endpoint = domain ? `https://${domain}/api/${apiVersion}/graphql.json` : '';

// Mock data for development when Shopify credentials are not set
const mockProducts = [
  {
    node: {
      id: 'gid://shopify/Product/1',
      title: 'Beard Oil',
      handle: 'beard-oil',
      description: 'Premium beard oil for the modern gentleman.',
      priceRange: {
        minVariantPrice: {
          amount: '24.99',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              url: 'https://placehold.co/800x800/101010/FFFFFF?text=Beard+Oil',
              altText: 'Beard Oil',
            },
          },
        ],
      },
    },
  },
  {
    node: {
      id: 'gid://shopify/Product/2',
      title: 'Beard Balm',
      handle: 'beard-balm',
      description: 'Premium beard balm for styling and conditioning.',
      priceRange: {
        minVariantPrice: {
          amount: '29.99',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              url: 'https://placehold.co/800x800/101010/FFFFFF?text=Beard+Balm',
              altText: 'Beard Balm',
            },
          },
        ],
      },
    },
  },
  {
    node: {
      id: 'gid://shopify/Product/3',
      title: 'Grooming Kit',
      handle: 'grooming-kit',
      description: 'Complete grooming kit for beard care.',
      priceRange: {
        minVariantPrice: {
          amount: '49.99',
          currencyCode: 'USD',
        },
      },
      images: {
        edges: [
          {
            node: {
              url: 'https://placehold.co/800x800/101010/FFFFFF?text=Grooming+Kit',
              altText: 'Grooming Kit',
            },
          },
        ],
      },
    },
  },
];

const mockCollections = [
  {
    node: {
      id: 'gid://shopify/Collection/1',
      title: 'Beard Oils',
      handle: 'beard-oils',
      description: 'Premium beard oils for all beard types.',
      image: {
        url: 'https://placehold.co/800x1000/101010/FFFFFF?text=Beard+Oils',
        altText: 'Beard Oils Collection',
      },
    },
  },
  {
    node: {
      id: 'gid://shopify/Collection/2',
      title: 'Beard Balms',
      handle: 'beard-balms',
      description: 'Premium beard balms for styling and conditioning.',
      image: {
        url: 'https://placehold.co/800x1000/101010/FFFFFF?text=Beard+Balms',
        altText: 'Beard Balms Collection',
      },
    },
  },
  {
    node: {
      id: 'gid://shopify/Collection/3',
      title: 'Grooming Kits',
      handle: 'grooming-kits',
      description: 'Complete grooming kits for beard care.',
      image: {
        url: 'https://placehold.co/800x1000/101010/FFFFFF?text=Grooming+Kits',
        altText: 'Grooming Kits Collection',
      },
    },
  },
];

// Helper function to make GraphQL requests to Shopify
async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  // If Shopify credentials are not set, return mock data
  if (!endpoint) {
    console.warn('Shopify credentials not set. Using mock data.');
    return {
      status: 200,
      body: { data: {} }, // This will be overridden by the calling function
    };
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return {
      status: 500,
      body: { errors: [{ message: 'Error fetching from Shopify' }] },
    };
  }
}

// Function to fetch products from Shopify
export async function getProducts() {
  const { body } = await shopifyFetch({
    query: `
      query Products {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  
  // If Shopify credentials are not set, return mock data
  if (!endpoint || !body.data?.products?.edges) {
    return mockProducts;
  }
  
  return body.data.products.edges;
}

// Function to fetch a single product by handle
export async function getProduct(handle: string) {
  // If Shopify credentials are not set, return mock data
  if (!endpoint) {
    const mockProduct = mockProducts.find(p => p.node.handle === handle);
    if (mockProduct) {
      return {
        ...mockProduct.node,
        descriptionHtml: `<p>${mockProduct.node.description}</p>`,
        variants: {
          edges: [
            {
              node: {
                id: `gid://shopify/ProductVariant/${mockProduct.node.id.split('/').pop()}-1`,
                title: 'Default',
                price: {
                  amount: mockProduct.node.priceRange.minVariantPrice.amount,
                  currencyCode: mockProduct.node.priceRange.minVariantPrice.currencyCode,
                },
                availableForSale: true,
              },
            },
          ],
        },
      };
    }
    return null;
  }

  const { body } = await shopifyFetch({
    query: `
      query Product($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    `,
    variables: { handle },
  });
  
  return body.data?.product || null;
}

// Function to fetch collections
export async function getCollections() {
  const { body } = await shopifyFetch({
    query: `
      query Collections {
        collections(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              image {
                url
                altText
              }
            }
          }
        }
      }
    `,
  });
  
  // If Shopify credentials are not set, return mock data
  if (!endpoint || !body.data?.collections?.edges) {
    return mockCollections;
  }
  
  return body.data.collections.edges;
} 