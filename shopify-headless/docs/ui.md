# UI Guidelines

## Brand Identity

### Brand Colors

Primary palette:
- **Primary**: `#000000` - Main background color
- **Secondary**: `#FFFFFF` - Main text color
- **Accent**: `#876447` - Accent color for buttons, highlights, and calls to action

Neutral palette:
- **Dark**: `#101010` - Secondary background color (footer)
- **Medium**: `#4A4A4A` - Secondary text color
- **Light**: `#E8E8E1` - Borders and dividers
- **White**: `#FFFFFF` - Text and foreground elements

Status colors:
- **Success**: `#4CAF50` - Success messages and indicators
- **Warning**: `#FFC107` - Warning messages and indicators
- **Error**: `#C20000` - Error messages and sale indicators
- **Info**: `#2196F3` - Informational messages and indicators

### Typography

#### Headings
- **Font Family**: Tenor Sans, sans-serif
- **Weights**: 400 (Regular)
- **Sizes**:
  - H1: 2.25rem (36px)
  - H2: 1.875rem (30px)
  - H3: 1.5rem (24px)
  - H4: 1.25rem (20px)
  - H5: 1rem (16px)
  - H6: 0.875rem (14px)
- **Capitalization**: All caps
- **Text Alignment**: Center

#### Body Text
- **Font Family**: Twentieth Century, sans-serif
- **Weights**: 400 (Regular), 500 (Medium)
- **Sizes**:
  - Body Large: 1.125rem (18px)
  - Body: 1rem (16px)
  - Body Small: 0.875rem (14px)
  - Caption: 0.75rem (12px)
- **Line Height**: 1.4

### Spacing System

Based on a 4px grid:
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px
- **4xl**: 96px

### Border Radius
- **None**: 0px
- **Small**: 2px
- **Medium**: 4px
- **Large**: 8px
- **Full**: 9999px (for circular elements)

## Component Guidelines

### Buttons

#### Primary Button
- Background: `#876447` (Accent color)
- Text: White
- Hover: Darken accent color by 10%
- Padding: 12px 24px
- Border Radius: Square (0px)
- Font Weight: Regular
- Text Transform: Uppercase

#### Secondary Button
- Background: Transparent
- Text: White
- Border: 1px solid White
- Hover: Light gray background
- Padding: 12px 24px
- Border Radius: Square (0px)
- Font Weight: Regular
- Text Transform: Uppercase

#### Tertiary Button
- Background: Transparent
- Text: White
- Hover: Light gray background
- Padding: 12px 24px
- Border Radius: Square (0px)
- Font Weight: Regular
- Text Transform: Uppercase

#### Button Sizes
- **Small**: Padding 8px 16px, Font size 14px
- **Medium**: Padding 12px 24px, Font size 16px
- **Large**: Padding 16px 32px, Font size 18px

### Form Elements

#### Text Input
- Background: White
- Text: Black
- Border: 1px solid Light color
- Border Radius: Square (0px)
- Padding: 12px 16px
- Focus: Border color Accent

#### Select
- Same styling as Text Input
- Custom dropdown icon

#### Checkbox & Radio
- Custom styling with Accent color for checked state

### Cards

#### Product Card
- Background: Black
- Border: None
- Border Radius: None (0px)
- Shadow: None
- Padding: 16px
- Image aspect ratio: Natural
- Hover: Subtle opacity change

#### Content Card
- Background: Black
- Border: 1px solid Light color
- Border Radius: None (0px)
- Padding: 24px

### Navigation

#### Main Navigation
- Background: Black
- Text: White
- Active: Accent color
- Hover: Accent color (lighter)
- Text Transform: Uppercase
- Font Size: 15px

#### Mobile Navigation
- Hamburger menu
- Slide-in drawer from left
- Background: White
- Text: Black
- Close icon in top right

### Product Elements

#### Product Images
- Main image aspect ratio: Natural
- Thumbnail aspect ratio: Natural
- Gallery: Grid layout with equal spacing
- Image zoom on hover

#### Product Price
- Regular price: Body text, Medium weight, White
- Sale price: Accent color, Medium weight
- Original price (when on sale): Strike-through, Light color

#### Add to Cart Button
- Primary button style
- Full width on mobile
- Icon: Shopping bag

### Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: ≥ 1280px

## Animation Guidelines

### Transitions
- **Duration**: 200-300ms
- **Easing**: Ease-out for most transitions
- **Properties**: opacity, transform, background-color

### Hover Effects
- Subtle opacity changes
- Color transitions
- Image zoom for product images

### Page Transitions
- Fade in/out
- Slide in from bottom for modals
- Slide in from right for page transitions

## Accessibility Guidelines

- Maintain color contrast ratio of at least 4.5:1 for normal text
- Ensure all interactive elements have focus states
- Provide text alternatives for non-text content
- Design for keyboard navigation
- Ensure touch targets are at least 44px × 44px
- Use semantic HTML elements

## Design System Implementation

The UI will be implemented using:
- Tailwind CSS for styling
- Headless UI components for accessibility
- Custom React components for complex interactions
- CSS variables for theming 