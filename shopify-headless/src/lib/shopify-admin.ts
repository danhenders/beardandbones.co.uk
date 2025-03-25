/**
 * Shopify Admin API utilities
 * This file contains functions for interacting with the Shopify Admin API
 */

// Shopify API credentials from environment variables
const SHOPIFY_SHOP_URL = process.env.SHOPIFY_SHOP_URL || '';
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2023-10';

/**
 * Base function to make requests to the Shopify Admin API
 */
async function shopifyAdminFetch(endpoint: string, options: RequestInit = {}) {
  if (!SHOPIFY_SHOP_URL || !SHOPIFY_ACCESS_TOKEN) {
    throw new Error('Shopify Admin API credentials not set');
  }

  const url = `https://${SHOPIFY_SHOP_URL}/admin/api/${SHOPIFY_API_VERSION}/${endpoint}`;
  
  const headers = {
    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Shopify Admin API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from Shopify Admin API:', error);
    throw error;
  }
}

/**
 * Get customer by ID
 */
export async function getCustomer(customerId: string) {
  try {
    const data = await shopifyAdminFetch(`customers/${customerId}.json`);
    return data.customer;
  } catch (error) {
    console.error(`Error fetching customer ${customerId}:`, error);
    throw error;
  }
}

/**
 * Get customer orders
 */
export async function getCustomerOrders(customerId: string) {
  try {
    const data = await shopifyAdminFetch(`customers/${customerId}/orders.json?status=any`);
    return data.orders;
  } catch (error) {
    console.error(`Error fetching orders for customer ${customerId}:`, error);
    throw error;
  }
}

/**
 * Get order by ID
 */
export async function getOrder(orderId: string) {
  try {
    const data = await shopifyAdminFetch(`orders/${orderId}.json`);
    return data.order;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
}

/**
 * Get order fulfillments
 */
export async function getOrderFulfillments(orderId: string) {
  try {
    const data = await shopifyAdminFetch(`orders/${orderId}/fulfillments.json`);
    return data.fulfillments;
  } catch (error) {
    console.error(`Error fetching fulfillments for order ${orderId}:`, error);
    throw error;
  }
}

/**
 * Get product by ID
 */
export async function getAdminProduct(productId: string) {
  try {
    const data = await shopifyAdminFetch(`products/${productId}.json`);
    return data.product;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
}

/**
 * Search for products
 */
export async function searchProducts(query: string) {
  try {
    const data = await shopifyAdminFetch(`products.json?title=${encodeURIComponent(query)}`);
    return data.products;
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    throw error;
  }
}

/**
 * Get shop information
 */
export async function getShopInfo() {
  try {
    const data = await shopifyAdminFetch('shop.json');
    return data.shop;
  } catch (error) {
    console.error('Error fetching shop information:', error);
    throw error;
  }
} 