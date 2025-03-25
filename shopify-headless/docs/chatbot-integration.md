# AI Chatbot Integration

This document explains how the AI chatbot is integrated into the Beard and Bones headless Shopify store and how to customize it.

## Overview

The AI chatbot provides real-time customer support by allowing users to ask questions about their orders, shipping information, account details, and product recommendations. It appears as a floating button in the bottom-right corner of the site and expands into a chat interface when clicked.

## Components

The chatbot implementation consists of several key components:

1. **ShopifyChat Component** (`src/components/ShopifyChat.tsx`): The main component that renders the chat interface and handles user interactions.

2. **Expandable Chat UI** (`src/components/ui/expandable-chat.tsx`): A reusable UI component that provides the expandable chat functionality.

3. **Chatbot API** (`src/app/api/chatbot/route.ts`): A serverless API route that processes user messages and generates responses.

4. **Shopify Admin API Utility** (`src/lib/shopify-admin.ts`): A utility for interacting with the Shopify Admin API to fetch customer data, orders, and products.

## Features

The chatbot provides the following features:

- **Order Tracking**: Users can ask about their recent orders and get information about order status, shipping details, and tracking links.
- **Account Information**: Users can retrieve their account details, including shipping addresses.
- **Product Information**: Users can ask about specific products and get detailed information.
- **Product Recommendations**: The chatbot can provide personalized product recommendations based on user preferences.
- **General Support**: The chatbot can answer general questions about the store, shipping policies, etc.

## Integration with Shopify

The chatbot integrates with Shopify in the following ways:

1. **Customer Data**: It fetches customer information from the Shopify Admin API to provide personalized responses.
2. **Order Data**: It retrieves order history and status information from Shopify.
3. **Product Data**: It can search for products and provide detailed product information.

## Customization

### Styling

The chatbot's appearance can be customized by modifying the following files:

- **ShopifyChat.tsx**: Contains the styling for the chat messages, input field, and header.
- **expandable-chat.tsx**: Contains the styling for the chat button and overall chat container.

Key styling elements:

- The chat button uses the brand's accent color (`#876447`).
- The chat header uses the same accent color with a robot emoji (🤖).
- User messages appear in the accent color, while assistant messages have a light gray background.

### Behavior

The chatbot's behavior can be customized by modifying the following:

- **Message Processing**: The logic for processing user messages is in `src/app/api/chatbot/route.ts`. You can add new patterns to recognize different types of queries.
- **Response Generation**: The responses are generated in the same file. You can modify the responses to match your brand voice.
- **Initial Message**: The initial greeting message can be changed in the `ShopifyChat` component.

### Adding New Capabilities

To add new capabilities to the chatbot:

1. Update the `processMessage` function in `src/app/api/chatbot/route.ts` to recognize new types of queries.
2. Add new functions to fetch the required data from Shopify or other sources.
3. Generate appropriate responses based on the data.

## Authentication

Currently, the chatbot uses mock data for development. In a production environment, you would need to:

1. Implement user authentication to identify the current user.
2. Use the authenticated user's ID to fetch their specific data from Shopify.
3. Secure the API routes to prevent unauthorized access.

## Deployment

The chatbot is automatically deployed with the rest of the application. Ensure that the following environment variables are set in your production environment:

```
SHOPIFY_SHOP_URL=your-shop.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-access-token
SHOPIFY_API_VERSION=2023-10
```

## Future Enhancements

Potential future enhancements for the chatbot:

1. **Natural Language Processing**: Integrate with a more sophisticated NLP service like OpenAI's API for better understanding of user queries.
2. **Multi-language Support**: Add support for multiple languages.
3. **Rich Media Responses**: Enable the chatbot to respond with images, product cards, etc.
4. **Conversation History**: Store conversation history for returning users.
5. **Human Handoff**: Add the ability to transfer the conversation to a human agent when needed.

## Troubleshooting

Common issues and their solutions:

1. **API Errors**: If the chatbot fails to respond, check the browser console for API errors. Ensure that your Shopify credentials are correctly set in the environment variables.
2. **Styling Issues**: If the chatbot doesn't match your brand style, check the styling in `ShopifyChat.tsx` and `expandable-chat.tsx`.
3. **Missing Data**: If the chatbot can't access customer data, ensure that the Shopify API is correctly configured and that the access token has the necessary permissions. 