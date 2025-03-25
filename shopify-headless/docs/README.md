# Beard and Bones Headless Shopify Store

This repository contains the documentation and codebase for the Beard and Bones headless Shopify store project. The project aims to create a high-performance, customizable storefront using Next.js and Vercel, while leveraging Shopify as the backend commerce platform.

## Documentation

### Project Planning
- [Project Plan](project-plan.md) - Overview of the project, goals, timeline, and success metrics
- [Web Specification Sheet](web-spec-sheet.md) - Technical and functional requirements
- [Software Architecture](software-architecture.md) - System architecture and component design
- [UI Guidelines](ui.md) - Design system and UI component specifications
- [Project Roadmap](roadmap.md) - Detailed timeline and task breakdown
- [Existing Theme Analysis](existing-theme-analysis.md) - Analysis of the current Shopify theme
- [Migration Strategy](migration-strategy.md) - Plan for transitioning to the headless architecture

### Getting Started

To get started with the project:

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables (see below)
4. Run the development server with `npm run dev`

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=beardandbonesuk.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN=your-storefront-api-token
NEXT_PUBLIC_SHOPIFY_API_VERSION=2023-10
```

## Project Structure

The project follows the structure outlined in the [Software Architecture](software-architecture.md) document:

```
/src
  /app                  # Next.js App Router
  /components           # Reusable components
  /lib                  # Utility functions
  /types                # TypeScript type definitions
/docs                   # Project documentation
/public                 # Static assets
```

## Development Workflow

1. Follow the [Project Roadmap](roadmap.md) for current tasks
2. Create feature branches from `main`
3. Submit pull requests for review
4. Merge to `main` after approval
5. Automated deployment via Vercel

## Migration Approach

We are following a phased migration approach as detailed in the [Migration Strategy](migration-strategy.md):

1. Development & Parallel Setup
2. Soft Launch & Testing
3. Full Cutover

## Contact

For questions or support, contact the project team:

- Project Manager: [Name]
- Lead Developer: [Name]
- Designer: [Name] 