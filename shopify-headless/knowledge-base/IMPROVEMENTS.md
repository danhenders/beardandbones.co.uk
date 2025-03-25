# Knowledge Base Improvements

## PRIORITY TASKS
1. Database Restructuring and Data Migration
   ( ) Create new database schema
      - ( ) Products table with inventory tracking
      - ( ) Customer data table
      - ( ) Orders history table
      - ( ) Marketing preferences table
   
   ( ) Data Migration Plan
      - ( ) Export current data
      - ( ) Map old to new schema
      - ( ) Verify data integrity
      - ( ) Implement new schema

2. Shopify Data Integration
   ( x) Product Data Fetching
      - ( x) Live inventory levels
      - ( x) Product URLs and handles
      - ( x) Variant information
      - ( x) Price history
      - ( x) Stock notifications setup
   
  2.1 ( ) Customer Data Fetching (27,000+ orders)
      - ( ) Order history
      - ( ) Customer profiles
      - ( ) Shipping preferences
      - ( ) Marketing subscriptions
      - ( ) Purchase patterns

3. Essential Knowledge Base Files
   ( ) Core Product Information
      - ( ) Product details
      - ( ) Inventory management
      - ( ) Pricing rules
      - ( ) Stock thresholds
   
   ( ) Customer Service Essentials
      - (X) Automated workflows
      - (X) Troubleshooting guide
      - ( ) FAQ
      - ( ) Common issues resolution

4. AI Integration
   ( ) Set up AI confidence scoring
   ( ) Implement Telegram integration
   ( ) Create learning system
   ( ) Set up auto-updates

## Data Fetching Specifications
### Product Data Requirements
- Real-time inventory sync
- Product variant tracking
- URL and handle management
- Price history tracking
- Stock level notifications
- Restock date tracking
- Product status updates

### Customer Data Requirements
- Order history
- Customer preferences
- Shipping information
- Marketing preferences
- Purchase patterns
- Customer value metrics
- Interaction history

### Database Schema Updates
```sql
-- Products Table (Updated)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    shopify_id VARCHAR(100) UNIQUE,
    title VARCHAR(200),
    handle VARCHAR(200),
    product_type VARCHAR(100),
    variant_title VARCHAR(200),
    sku VARCHAR(100),
    price DECIMAL(10,2),
    stock_level INTEGER,
    restock_date DATE,
    notify_threshold INTEGER,
    shopify_url VARCHAR(500),
    notify_url VARCHAR(500),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Customer Data Table (New)
CREATE TABLE customer_data (
    id SERIAL PRIMARY KEY,
    shopify_customer_id VARCHAR(100) UNIQUE,
    email VARCHAR(255),
    total_orders INTEGER,
    total_spent DECIMAL(10,2),
    average_order_value DECIMAL(10,2),
    first_order_date TIMESTAMP,
    last_order_date TIMESTAMP,
    marketing_status BOOLEAN,
    preferred_scents JSONB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Order History Table (New)
CREATE TABLE order_history (
    id SERIAL PRIMARY KEY,
    shopify_order_id VARCHAR(100) UNIQUE,
    customer_id INTEGER REFERENCES customer_data(id),
    order_date TIMESTAMP,
    total_amount DECIMAL(10,2),
    items JSONB,
    shipping_address JSONB,
    status VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### API Integration Requirements
1. Shopify API
   - Rate limiting consideration
   - Batch processing for large data sets
   - Webhook setup for real-time updates
   - Error handling and retry logic

2. Data Sync Schedule
   - Real-time: Inventory updates
   - Hourly: Order processing
   - Daily: Customer data updates
   - Weekly: Analytics and reporting

main things:

1.product database restructuring, delete all the old tables from postgres and create new ones.then upload the data from the old tables to the new ones. 
2. Pull all customer dynamic data from shopify - all 27,000 orders - slowly watching shopify api rate limits. This includes customer information, order history, shipping information, Email marketing data - subscribed or not. then upload to database
3. Add a new user database, with default admin user for both domains - help@beardandbones.co.uk and dan@beardandbones.co.uk.
4. Complete restructing all knowledge base files to yaml format. 
5. Add a new database for all the knowledge base files. 
6. Build new templates for AI Studio
7. Upload and store AI images to the database.
8. Implement AI Learning System with Telegram Integration

Add syncing from shopify to the database. 

## AI Learning System Implementation
### Core Learning System
( ) Set up AI confidence scoring system
   - ( ) Implement real-time analysis
   - ( ) Configure scoring weights
   - ( ) Set up threshold monitoring
   - ( ) Create feedback loops

### Telegram Integration
( ) Set up Telegram Bot Commands
   - ( ) Create command structure for knowledge base updates
   - ( ) Implement stock update commands
   - ( ) Add product information update commands
   - ( ) Create customer service response templates

### Knowledge Base Auto-Updates
( ) Implement Dynamic Updates System
   - ( ) Create database tables for temporary knowledge
   - ( ) Set up verification system for AI-suggested updates
   - ( ) Implement approval workflow via Telegram
   - ( ) Add changelog tracking for all updates

### Stock Management Integration
( ) Create Stock Update System
   - ( ) Add restock date tracking
   - ( ) Implement Telegram commands for stock updates
   - ( ) Create automated notifications for stock changes
   - ( ) Set up customer notification system

### Testing Framework
( ) Build Comprehensive Testing Suite
   - ( ) Create test scenarios for AI responses
   - ( ) Test confidence scoring accuracy
   - ( ) Verify learning system effectiveness
   - ( ) Test Telegram integration
   - ( ) Validate knowledge base updates

### Telegram Commands to Implement
( ) Stock Management
   ```
   /updatestock [product_id] [quantity] [restock_date]
   /checkstock [product_id]
   /setrestockdate [product_id] [date]
   ```

( ) Knowledge Base Updates
   ```
   /updateinfo [category] [key] [value]
   /addtemplate [category] [template_name]
   /approve [update_id]
   /reject [update_id] [reason]
   ```

( ) AI Learning Management
   ```
   /reviewresponse [message_id]
   /updateconfidence [category] [new_threshold]
   /addpattern [category] [pattern]
   ```

## Knowledge Base Conversion Tasks
### Support Files
(X) Convert customer-service-guide.md to YAML
(X) Convert escalation-policy.md to YAML
(X) Convert automated-workflows.md to YAML
(X) Convert troubleshooting-guide.md to YAML
(X) Convert faq.md to YAML
(X) Convert Customer issues and resolution.md to YAML

### Product Files (Verify & Merge with existing products.yaml)
( ) Review and merge beard-butter.md
( ) Review and merge beard-oil-sample-kit.md
( ) Review and merge beard-shampoo.md
( ) Review and merge beard-balm.md
( ) Review and merge beard-oil.md
( ) Review and merge Product.md

### Company Files (Verify & Merge with existing responses.yaml)
( ) Review and merge response-templates.md
( ) Review and merge brand-voice.md

## URGENT: Database Restructuring
Current Location: Railway PostgreSQL Database
Connection: postgresql://postgres:[password]@maglev.proxy.rlwy.net:52793/railway

### Current Status
All tables can be reset as users and roles are empty:
- beard_care_products (has data)
- inventory_levels (has data)
- price_history (has data)
- product_variants (has data)
- users (empty)
- roles (empty)

### New Database Structure
1. Products Table
File Location: `apps/core/models/product.py`
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    shopify_id VARCHAR(100) UNIQUE,
    title VARCHAR(200),
    handle VARCHAR(200),
    product_type VARCHAR(100),
    variant_title VARCHAR(200),
    sku VARCHAR(100),
    price DECIMAL(10,2),
    stock_level INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

2. Users Table (Fresh Setup)
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    role_id INTEGER,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Roles Table (Fresh Setup)
```sql
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL,
    description VARCHAR(255),
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Implementation Steps
1. Complete Database Reset
   - Use `apps/core/database/reset_tables.py`
   - Will drop ALL tables and create fresh schema
   - No need for backup since users/roles are empty

2. Create New Models
   - Update: `apps/core/models/product.py`
   - Update: `apps/core/models/user.py`
   - Update: `apps/core/models/__init__.py`

3. Initial Data Setup
   - Create default admin role
   - Create initial admin user
   - Update Shopify sync for new product structure

4. Update Shopify Sync
   - File: `apps/core/database/shopify_data_pull.py`
   - Simplify to work with single products table
   - Remove variant/inventory complexity

### Files to Modify
1. `apps/core/models/product.py` (new simplified version)
2. `apps/core/models/user.py` (fresh setup)
3. `apps/core/models/__init__.py` (update imports)
4. `apps/core/database/shopify_data_pull.py` (simplify)
5. `apps/core/database/reset_tables.py` (update for new structure)

### Default Data to Create
1. Roles:
   - Admin (full access)
   - Staff (limited access)
   - API (restricted access)

2. Users:
   - Admin user: admin@beardandbones.co.uk

## Completed Tasks
(X) Convert shipping policy to YAML format with AI handling instructions
(X) Convert returns policy to YAML format with AI handling instructions
(X) Convert privacy policy to YAML format with AI handling instructions
(X) Add sentiment analysis framework
(X) Add probing questions framework
(X) Add information control guidelines
(X) Add response templates with variables

## Pending Policy Conversions
( ) Convert product safety policy to YAML
( ) Convert terms of service to YAML
( ) Convert customer service guidelines to YAML
( ) Add AI handling instructions to each policy
( ) Review and standardize all policy metadata

## Knowledge Base Structure
( ) Create unified schema for all policy files
( ) Standardize response template format
( ) Create central config file for shared variables
( ) Implement version control for policy updates
( ) Add changelog tracking

## AI Response Enhancement
( ) Create sentiment analysis scoring system
( ) Develop priority level assignment logic
( ) Build probing question decision tree
( ) Create escalation workflow diagram
( ) Define response template variables list

## Data Integration Tasks
( ) Connect to Shopify API for real-time data
   - ( ) Order status
   - ( ) Shipping updates
   - ( ) Customer details
   - ( ) Product availability

( ) PostgreSQL Integration
   - ( ) Customer history
   - ( ) Previous interactions
   - ( ) Return history
   - ( ) Preference data

## Testing Plan

### Basic Parsing Tests
( ) Test YAML file loading
( ) Validate schema compliance
( ) Check template variable replacement
( ) Verify markdown content rendering

### AI Understanding Tests
( ) Test sentiment analysis accuracy
( ) Verify probing question selection
( ) Check escalation trigger detection
( ) Validate information control compliance

### Integration Tests
( ) Test Shopify data retrieval
   - ( ) Order lookup
   - ( ) Shipping status
   - ( ) Customer verification
   - ( ) Product availability

( ) Test PostgreSQL queries
   - ( ) Customer history retrieval
   - ( ) Return status lookup
   - ( ) Preference data access

### Scenario Testing
( ) Standard Returns
   - ( ) New return request
   - ( ) Return status check
   - ( ) Refund explanation

( ) Special Cases
   - ( ) Allergic reactions
   - ( ) Damaged products
   - ( ) Wrong items shipped

( ) Privacy Requests
   - ( ) Data access requests
   - ( ) Marketing opt-out
   - ( ) Account deletion

( ) Shipping Queries
   - ( ) Delivery time estimates
   - ( ) Tracking information
   - ( ) International shipping

### Response Quality Tests
( ) Test tone consistency
( ) Verify information accuracy
( ) Check template customization
( ) Validate variable replacement

## Dynamic Data Tests

### Shopify Integration
( ) Order Tracking
   - ( ) Real-time status updates
   - ( ) Shipping address verification
   - ( ) Delivery timeline accuracy

( ) Customer Data
   - ( ) Purchase history
   - ( ) Shipping preferences
   - ( ) Contact information

### Database Integration
( ) Customer Profile
   - ( ) Previous interactions
   - ( ) Return history
   - ( ) Preference tracking

( ) Order Management
   - ( ) Status updates
   - ( ) Address changes
   - ( ) Special instructions

## Next Steps
1. Complete remaining policy conversions
2. Implement testing framework
3. Set up data integration
4. Run comprehensive tests
5. Review and refine AI responses
6. Document best practices

## Notes
- Maintain consistent formatting across all files
- Ensure all sensitive data is properly handled
- Keep track of template variables
- Document all test cases
- Monitor AI response quality 

## Missing Knowledge Base Categories
### Training and Onboarding
( ) Create training materials YAML
   - ( ) New staff onboarding procedures
   - ( ) System access and permissions
   - ( ) Common scenarios training
   - ( ) Response templates guide

### Product Knowledge
( ) Create product matrices YAML
   - ( ) Product comparisons
   - ( ) Cross-selling guides
   - ( ) Seasonal recommendations
   - ( ) Product lifecycle information
   - ( ) Ingredient compatibility

### Operations
( ) Create operations YAML
   - ( ) Shift handover procedures
   - ( ) Weekend/holiday protocols
   - ( ) Emergency contact hierarchy
   - ( ) Service level agreements (SLAs)

### Analytics and Reporting
( ) Create analytics YAML
   - ( ) KPI definitions
   - ( ) Report templates
   - ( ) Performance metrics
   - ( ) Success rate tracking

### Customer Segmentation
( ) Create customer segments YAML
   - ( ) VIP customer criteria
   - ( ) Loyalty program tiers
   - ( ) Customer lifetime value
   - ( ) Engagement metrics

### Quality Control
( ) Create quality control YAML
   - ( ) Product testing procedures
   - ( ) Batch tracking
   - ( ) Customer feedback analysis
   - ( ) Improvement tracking

## Notes
- All new YAML files should follow established format
- Include AI handling instructions in each file
- Add Telegram integration points
- Ensure learning system compatibility 