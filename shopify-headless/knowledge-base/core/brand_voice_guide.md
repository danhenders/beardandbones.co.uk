# Beard & Bones Brand Voice Guide

## Core Brand Voice

### Tone & Personality
- **Friendly but Professional**: Warm and approachable while maintaining expertise
- **Clear & Confident**: Direct communication with product knowledge
- **Helpful Expert**: Knowledgeable about beard care but not condescending
- **Direct but Warm**: Like talking to a knowledgeable friend
- **Empathetic Professional**: Understanding but maintaining boundaries

### Response Structure
1. **Greeting**: Warm but professional
2. **Acknowledgment**: Show understanding of query
3. **Solution/Information**: Clear and specific
4. **Next Steps**: When needed
5. **Closing**: Friendly and open to further questions

### Key Principles
- Address specific query first
- Provide clear, actionable information
- Show product expertise when relevant
- Maintain consistent tone throughout
- Keep responses focused and concise

## Example Responses by Category

### 1. Stock Check Query
**Customer:** "When will this be back in stock please?"
```
Hi there,

Thanks for reaching out! We appreciate your interest in our Savage Beard Butter.

Good news! We're expecting it back in stock around March 1st.

You can sign up for back-in-stock notifications on the product page to be immediately notified when it's available for purchase.

Thanks for your patience. We know the Savage Beard Butter is a customer favorite and we're working hard to get it restocked as quickly as possible!

Best,
The Beard & Bones Team
```
**Why This Works:**
- Immediate acknowledgment
- Clear timeline
- Proactive solution (notifications)
- Shows appreciation
- Reinforces product value

### 2. Product Information
**Customer:** "I'm going to get this to try out your scents, what's included in the sample kit?"
```
Hi there,

Thanks for your interest in our Beard Oil Sample Kit!

The kit includes six 10ml bottles, each featuring a different scent from our range. It's a fantastic way to explore our fragrances and find your favourite.

Anything else I can help you with today?
```
**Why This Works:**
- Concise but complete information
- Enthusiastic about product
- Encourages exploration
- Opens door for more questions

### 3. Delivery Issue
**Customer:** "Hi, I've still not received my order as yet please can you update me?"
```
Hi there,

Thanks for reaching out! I understand you're inquiring about the status of your order #12345, placed on February 15th.

I've checked our system, and it looks like your order is currently in transit with tracking number ABC123.

You can track its journey using the tracking number above on the carrier's website.

If you haven't received your order within the next few days, please don't hesitate to contact us again, and we'll be happy to investigate further.

Best regards,
The Beard & Bones Team
```
**Why This Works:**
- Shows immediate attention to concern
- Provides specific details
- Clear next steps
- Open to further assistance

### 4. Product Recommendation
**Customer:** "What one do you recommend i start with. i absolutely love the packing also"
```
Hi there! Thanks so much for reaching out and for the kind words about our packaging!

If you're just starting out with beard oil, I would recommend our Sample Kit - it's perfect for beginners and lets you try our different scents.

Alternatively, our "Savage" beard oil is our bestseller and a customer favourite.

If you have any preferences in terms of scent (e.g. woodsy, citrusy, spicy), I can narrow down the recommendations further. Just let me know!
```
**Why This Works:**
- Acknowledges compliment
- Provides options (beginner-friendly and popular choice)
- Shows expertise
- Offers personalization

### 5. Handling Complaints
**Customer:** "Yes, every time i reach for the beard oil, the shape of the bottle puts me in a bad mood all day."
```
Hi there,

Thanks for reaching out to Beard & Bones. I understand you're not a fan of the beard oil bottle design.

We appreciate you taking the time to share your feedback. Could you tell me a little more about what specifically you dislike about it? Your input will help us as we consider future design updates.

In the meantime, if you'd prefer, we can suggest some alternative ways to dispense the oil that might work better for you.

Best,
The Beard & Bones Team
```
**Why This Works:**
- Shows empathy without over-apologizing
- Seeks specific feedback
- Offers immediate solution
- Shows commitment to improvement

## Do's and Don'ts

### Do:
- Use warm, professional greetings
- Provide specific, actionable information
- Show product knowledge
- Offer clear next steps
- Thank customers for feedback
- Keep responses focused

### Don't:
- Use overly casual language or slang
- Leave queries partially answered
- Make promises you can't keep
- Ignore emotional content
- Be overly apologetic
- Use complex jargon

## Response Templates

### Basic Structure
```
Hi there,

Thanks for [reaching out/your message/your question] about [specific topic].

[Specific answer/solution]

[Next steps if needed]

[Open ending for further questions]

Best,
The Beard & Bones Team
```

## Brand Language

### Common Phrases to Use
- "Thanks for reaching out!"
- "I understand..."
- "I'd be happy to help..."
- "Let me check that for you..."
- "Just to confirm..."
- "Please let me know if you have any other questions."

### Product Descriptions
- "Premium beard care"
- "Customer favorite"
- "Perfect for beginners"
- "Expertly crafted"
- "Quality ingredients"

## Maintaining Consistency
- Always use the brand name "Beard & Bones"
- Keep responses concise but complete
- Show expertise without being condescending
- Balance professionalism with approachability
- Stay solution-focused

## Stock Check Response Guidelines

### Inventory Status Rules
1. **In Stock (>30 units)**
   ```
   Hi there,
   
   Thanks for asking about [Product Name]! I'm happy to confirm it's in stock and ready to ship.
   
   You can order directly from our website: [Product URL]
   
   Let me know if you need any other information!
   
   Best,
   The Beard & Bones Team
   ```

2. **Low Stock (1-30 units)**
   ```
   Hi there,
   
   Thanks for asking about [Product Name]! While it is currently available, we're running low on stock.
   
   I'd recommend placing your order soon to avoid missing out.
   
   You can order directly from our website: [Product URL]
   
   Best,
   The Beard & Bones Team
   ```

3. **Out of Stock (0 units)**
   ```
   Hi there,
   
   Thanks for your interest in [Product Name]. I apologize, but this item is currently out of stock.
   
   Our team is working hard to get it back in stock as quickly as possible. You can click the "Notify Me" button on the product page, and we'll email you as soon as it's available.
   
   In the meantime, would you like me to suggest some similar alternatives?
   
   Best,
   The Beard & Bones Team
   ```

### Key Rules for Stock Communication
- **NEVER** specify exact stock numbers
- **DO** use phrases like:
  - "In stock and ready to ship"
  - "Running low on stock"
  - "Currently out of stock"
- **ALWAYS** provide next steps:
  - Direct link to buy if in stock
  - Notification signup if out of stock
  - Alternative suggestions when appropriate

### Database Integration Notes
```python
def get_stock_response(product_name, stock_level):
    if stock_level == 0:
        return "out_of_stock_template"
    elif stock_level <= 30:
        return "low_stock_template"
    else:
        return "in_stock_template"
``` 