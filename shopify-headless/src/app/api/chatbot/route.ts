import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as ShopifyAdmin from '@/lib/shopify-admin';

// Shopify API credentials from environment variables
const SHOPIFY_SHOP_URL = process.env.SHOPIFY_SHOP_URL || '';
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '';

// Mock customer data for development - in production, this would come from Shopify's API
const mockCustomerData = {
  orders: [
    {
      id: 'order_123456',
      orderNumber: '1001',
      processedAt: '2023-12-15T10:30:00Z',
      totalPrice: '149.99',
      status: 'Delivered',
      trackingInfo: {
        number: 'TRK123456789',
        company: 'UPS',
        url: 'https://www.ups.com/track?tracknum=TRK123456789'
      },
      lineItems: [
        { title: 'Beard Oil', quantity: 1, price: '24.99' },
        { title: 'Beard Balm', quantity: 1, price: '29.99' },
        { title: 'Grooming Kit', quantity: 1, price: '95.01' }
      ],
      shippingAddress: {
        address1: '123 Beard St',
        city: 'London',
        province: 'England',
        zip: 'SW1A 1AA',
        country: 'United Kingdom'
      }
    },
    {
      id: 'order_789012',
      orderNumber: '1002',
      processedAt: '2024-01-20T14:45:00Z',
      totalPrice: '54.98',
      status: 'In Transit',
      trackingInfo: {
        number: 'TRK987654321',
        company: 'Royal Mail',
        url: 'https://www.royalmail.com/track-your-item#/tracking/TRK987654321'
      },
      lineItems: [
        { title: 'Beard Oil', quantity: 2, price: '49.98' },
        { title: 'Beard Comb', quantity: 1, price: '5.00' }
      ],
      shippingAddress: {
        address1: '456 Mustache Ave',
        city: 'Manchester',
        province: 'England',
        zip: 'M1 1AA',
        country: 'United Kingdom'
      }
    }
  ],
  customer: {
    firstName: 'John',
    lastName: 'Beardman',
    email: 'john@example.com',
    phone: '+44 1234 567890',
    defaultAddress: {
      address1: '123 Beard St',
      city: 'London',
      province: 'England',
      zip: 'SW1A 1AA',
      country: 'United Kingdom'
    }
  }
};

// Function to get customer data from Shopify
async function getCustomerData(customerId?: string) {
  // For development, we'll use a mock customer ID
  const mockCustomerId = customerId || '1234567890';
  
  // Check if Shopify credentials are available
  if (!SHOPIFY_SHOP_URL || !SHOPIFY_ACCESS_TOKEN) {
    console.warn('Shopify credentials not set. Using mock data.');
    return mockCustomerData;
  }

  try {
    // In a real implementation with authenticated users, we would:
    // 1. Get the customer ID from the authenticated session
    // 2. Fetch the customer data using the Shopify Admin API
    
    // For now, we'll attempt to use the Shopify Admin API but fall back to mock data
    try {
      const customer = await ShopifyAdmin.getCustomer(mockCustomerId);
      const orders = await ShopifyAdmin.getCustomerOrders(mockCustomerId);
      
      // Process orders to match our expected format
      const processedOrders = orders.map((order: any) => {
        // Extract tracking info from fulfillments if available
        let trackingInfo = null;
        if (order.fulfillments && order.fulfillments.length > 0) {
          const fulfillment = order.fulfillments[0];
          if (fulfillment.tracking_number) {
            trackingInfo = {
              number: fulfillment.tracking_number,
              company: fulfillment.tracking_company || 'Shipping Company',
              url: fulfillment.tracking_url || '#'
            };
          }
        }
        
        return {
          id: order.id,
          orderNumber: order.order_number.toString(),
          processedAt: order.processed_at,
          totalPrice: order.total_price,
          status: order.fulfillment_status || 'Unfulfilled',
          trackingInfo: trackingInfo || {
            number: 'N/A',
            company: 'N/A',
            url: '#'
          },
          lineItems: order.line_items.map((item: any) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price
          })),
          shippingAddress: order.shipping_address ? {
            address1: order.shipping_address.address1,
            city: order.shipping_address.city,
            province: order.shipping_address.province,
            zip: order.shipping_address.zip,
            country: order.shipping_address.country
          } : null
        };
      });
      
      return {
        customer: {
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          phone: customer.phone,
          defaultAddress: customer.default_address ? {
            address1: customer.default_address.address1,
            city: customer.default_address.city,
            province: customer.default_address.province,
            zip: customer.default_address.zip,
            country: customer.default_address.country
          } : null
        },
        orders: processedOrders
      };
    } catch (apiError) {
      console.warn('Failed to fetch from Shopify API, using mock data:', apiError);
      return mockCustomerData;
    }
  } catch (error) {
    console.error('Error fetching customer data from Shopify:', error);
    return mockCustomerData;
  }
}

// Function to get order data from Shopify
async function getOrderData(orderId?: string) {
  try {
    const customerData = await getCustomerData();
    return customerData.orders;
  } catch (error) {
    console.error('Error fetching orders from Shopify:', error);
    return mockCustomerData.orders;
  }
}

// Function to search products from Shopify
async function searchProducts(query: string) {
  // Check if Shopify credentials are available
  if (!SHOPIFY_SHOP_URL || !SHOPIFY_ACCESS_TOKEN) {
    console.warn('Shopify credentials not set. Using mock data.');
    return [];
  }

  try {
    return await ShopifyAdmin.searchProducts(query);
  } catch (error) {
    console.error('Error searching products from Shopify:', error);
    return [];
  }
}

// Function to process the user's message and generate a response
async function processMessage(message: string, history: any[]) {
  const lowerMessage = message.toLowerCase();
  
  // Check for shipping-related queries
  if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('track')) {
    const orders = await getOrderData();
    const recentOrder = orders[0];
    
    if (recentOrder) {
      if (lowerMessage.includes('track')) {
        return `Your most recent order (#${recentOrder.orderNumber}) is currently ${recentOrder.status}. You can track it using the tracking number ${recentOrder.trackingInfo.number} via ${recentOrder.trackingInfo.company}. Here's the tracking link: ${recentOrder.trackingInfo.url}`;
      } else {
        return `Your most recent order (#${recentOrder.orderNumber}) from ${new Date(recentOrder.processedAt).toLocaleDateString()} is being shipped to ${recentOrder.shippingAddress.address1}, ${recentOrder.shippingAddress.city}, ${recentOrder.shippingAddress.zip}. The current status is: ${recentOrder.status}.`;
      }
    } else {
      return "I couldn't find any recent orders for your account. If you've just placed an order, it might take a little time to process.";
    }
  }
  
  // Check for order-related queries
  if (lowerMessage.includes('order') || lowerMessage.includes('purchase')) {
    const orders = await getOrderData();
    
    if (orders.length > 0) {
      const recentOrder = orders[0];
      const orderDate = new Date(recentOrder.processedAt).toLocaleDateString();
      const items = recentOrder.lineItems.map((item: any) => `${item.quantity}x ${item.title} (£${item.price})`).join(', ');
      
      return `Your most recent order (#${recentOrder.orderNumber}) was placed on ${orderDate} for a total of £${recentOrder.totalPrice}. You ordered: ${items}. The current status is: ${recentOrder.status}.`;
    } else {
      return "I couldn't find any orders associated with your account. If you've just placed an order, it might take a little time to process.";
    }
  }
  
  // Check for account-related queries
  if (lowerMessage.includes('account') || lowerMessage.includes('profile') || lowerMessage.includes('address')) {
    const customerData = await getCustomerData();
    const customer = customerData.customer;
    
    return `Your account information: Name: ${customer.firstName} ${customer.lastName}, Email: ${customer.email}, Default shipping address: ${customer.defaultAddress.address1}, ${customer.defaultAddress.city}, ${customer.defaultAddress.zip}, ${customer.defaultAddress.country}.`;
  }
  
  // Check for product search queries
  if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('looking for')) {
    // Extract potential product name from the message
    let productQuery = '';
    
    if (lowerMessage.includes('beard oil')) productQuery = 'beard oil';
    else if (lowerMessage.includes('beard balm')) productQuery = 'beard balm';
    else if (lowerMessage.includes('grooming kit')) productQuery = 'grooming kit';
    else if (lowerMessage.includes('beard')) productQuery = 'beard';
    
    if (productQuery) {
      try {
        const products = await searchProducts(productQuery);
        
        if (products && products.length > 0) {
          const topProducts = products.slice(0, 3);
          const productList = topProducts.map((p: any) => 
            `${p.title} - £${p.variants[0]?.price || 'Price unavailable'}`
          ).join('\n');
          
          return `I found these products that might interest you:\n\n${productList}\n\nWould you like more information about any of these?`;
        } else {
          return `I couldn't find any products matching "${productQuery}". Would you like to see our bestsellers instead?`;
        }
      } catch (error) {
        console.error('Error searching products:', error);
        return "I'm having trouble searching our products right now. Please try again later or browse our collections on the website.";
      }
    }
  }
  
  // Check for product recommendations
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion') || lowerMessage.includes('best')) {
    return "Based on your previous purchases, I'd recommend our Premium Beard Oil Collection. It includes our top-selling scents and is perfect for daily grooming. Would you like me to show you more details?";
  }
  
  // Check for product information queries
  if (lowerMessage.includes('product') || lowerMessage.includes('beard oil') || lowerMessage.includes('beard balm') || lowerMessage.includes('grooming kit')) {
    if (lowerMessage.includes('beard oil')) {
      return "Our premium beard oils are crafted with natural ingredients to nourish your beard and the skin beneath. They help reduce itchiness, promote healthy growth, and leave your beard smelling great. Available in various scents including Sandalwood, Cedarwood, and Citrus. Prices start at £24.99.";
    } else if (lowerMessage.includes('beard balm')) {
      return "Our beard balms provide excellent hold and conditioning for your beard. They're perfect for styling and taming unruly beards while moisturizing the skin beneath. Available in various scents to match our oils. Prices start at £29.99.";
    } else if (lowerMessage.includes('grooming kit')) {
      return "Our complete grooming kits include everything you need for proper beard care: beard oil, beard balm, beard wash, a wooden comb, and scissors. It's the perfect starter kit or gift for any bearded gentleman. Prices start at £89.99.";
    } else {
      return "We offer a range of premium beard care products including oils, balms, washes, combs, and complete grooming kits. All our products are handcrafted using natural ingredients. Would you like information about a specific product?";
    }
  }
  
  // Default responses for other queries
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your Beard and Bones assistant. How can I help you today? You can ask me about your orders, shipping, account information, or product recommendations.";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I can help you with tracking your orders, checking shipping status, viewing your account information, and providing product recommendations. What would you like to know?";
  }
  
  // Fallback response
  return "I'm not sure I understand. You can ask me about your orders, shipping status, account information, or product recommendations. How can I assist you today?";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    const response = await processMessage(message, history || []);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing chatbot request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 