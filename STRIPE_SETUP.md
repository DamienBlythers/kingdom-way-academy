# 🚀 Kingdom Way Academy - Stripe Setup Guide

## ✅ What I've Built So Far

1. **Stripe Subscription Plans** - 3 tiers ($19, $49, $149/mo)
2. **Checkout Flow** - `/api/stripe/checkout`
3. **Billing Portal** - `/api/stripe/portal`
4. **Pricing Page** - `/pricing`
5. **Success Page** - `/checkout/success`

---

## 🔧 What You Need to Do (10 Minutes)

### **Step 1: Create Stripe Products & Prices**

Go to: https://dashboard.stripe.com/test/products

#### **Product 1: Starter**
- Click "Add Product"
- Name: `Starter`
- Description: `Access to 1 Course • Basic Email Support • Community Access`
- Pricing:
  - Model: `Recurring`
  - Price: `$19.00`
  - Billing period: `Monthly`
- Click "Save product"
- **Copy the Price ID** (starts with `price_...`)

#### **Product 2: Pro Scholar** (RECOMMENDED)
- Click "Add Product"
- Name: `Pro Scholar`
- Description: `Unlimited Course Access • Completion Certificates • Priority Support • Downloadable Resources • Kingdom Labs Access`
- Pricing:
  - Model: `Recurring`
  - Price: `$49.00`
  - Billing period: `Monthly`
- Click "Save product"
- **Copy the Price ID** (starts with `price_...`)

#### **Product 3: Team / Group**
- Click "Add Product"
- Name: `Team / Group`
- Description: `5 User Seats Included • Admin Dashboard • Progress Reporting • Bulk Enrollment • Dedicated Success Manager`
- Pricing:
  - Model: `Recurring`
  - Price: `$149.00`
  - Billing period: `Monthly`
- Click "Save product"
- **Copy the Price ID** (starts with `price_...`)

---

### **Step 2: Update Price IDs in Code**

Open `lib/stripe-plans.ts` and replace the placeholder `priceId` values:

```typescript
export const STRIPE_PLANS = {
  starter: {
    name: "Starter",
    priceId: "price_YOUR_ACTUAL_STARTER_PRICE_ID", // ← REPLACE THIS
    price: 1900,
    // ...
  },
  proScholar: {
    name: "Pro Scholar",
    priceId: "price_YOUR_ACTUAL_PRO_PRICE_ID", // ← REPLACE THIS
    price: 4900,
    // ...
  },
  team: {
    name: "Team / Group",
    priceId: "price_YOUR_ACTUAL_TEAM_PRICE_ID", // ← REPLACE THIS
    price: 14900,
    // ...
  },
};
```

---

### **Step 3: Set Up Stripe Webhook**

#### **A. Get Your Webhook Endpoint URL**

Once deployed to Vercel, your webhook URL will be:
```
https://kingdomwaylearning.com/api/stripe/webhook
```

For local testing:
```bash
# Install Stripe CLI (if not already)
# On Windows: Download from https://github.com/stripe/stripe-cli/releases
# Or use: scoop install stripe

# Login to Stripe
stripe login

# Forward webhooks to local dev server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

#### **B. Add Webhook in Stripe Dashboard**

Go to: https://dashboard.stripe.com/test/webhooks

1. Click "+ Add endpoint"
2. Endpoint URL: `https://kingdomwaylearning.com/api/stripe/webhook` (production) or use Stripe CLI for testing
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Click "Add endpoint"
5. **Copy the Webhook Signing Secret** (starts with `whsec_...`)

---

### **Step 4: Update Environment Variables**

Add to your `.env.local`:

```bash
# Stripe (you already have these in your .env.local)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_API_KEY=sk_test_YOUR_KEY_HERE

# Add this NEW one:
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

---

### **Step 5: Enable Customer Portal**

Go to: https://dashboard.stripe.com/test/settings/billing/portal

1. Click "Activate test link"
2. Under "Functionality":
   - ✅ Enable "Allow customers to update their payment methods"
   - ✅ Enable "Allow customers to update their subscriptions"
   - ✅ Enable "Allow customers to cancel subscriptions"
3. Click "Save changes"

---

## 🧪 Testing the Flow

### **1. Test Checkout**
```bash
pnpm dev
```

1. Go to: http://localhost:3000/pricing
2. Click "Start Free Trial" on any plan
3. Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
4. Complete checkout
5. Should redirect to `/checkout/success`

### **2. Test Billing Portal**

Add a button to your dashboard:

```tsx
// In app/dashboard/page.tsx
<Button onClick={async () => {
  const res = await fetch('/api/stripe/portal', { method: 'POST' });
  const { url } = await res.json();
  window.location.href = url;
}}>
  Manage Billing
</Button>
```

---

## 🚀 What's Next?

Once you give me the **Resend API key**, I'll build:

1. ✅ Welcome email on sign-up
2. ✅ Payment confirmation email
3. ✅ Course enrollment email
4. ✅ Lesson completion notifications
5. ✅ Certificate delivery email

---

## 📊 Current Progress

| Feature | Status |
|---------|--------|
| Stripe Products | ⏳ You need to create |
| Checkout Flow | ✅ Built |
| Billing Portal | ✅ Built |
| Pricing Page | ✅ Built |
| Success Page | ✅ Built |
| Webhook Handler | 🔄 Next (need webhook secret) |
| Email System | ⏳ Waiting for Resend key |

---

**Drop the Resend API key when you have it and I'll continue building!** 🔥
