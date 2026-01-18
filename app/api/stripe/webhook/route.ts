import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendPaymentSuccessEmail } from "@/emails/send";
import { STRIPE_PLANS, getPlanByPriceId } from "@/lib/stripe-plans";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("[STRIPE_WEBHOOK] Invalid signature:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const subscription = event.data.object as Stripe.Subscription;

  console.log("[STRIPE_WEBHOOK] Event type:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // Payment successful - subscription created
        const clerkUserId = session?.metadata?.clerkUserId;

        if (!clerkUserId) {
          console.error("[STRIPE_WEBHOOK] No clerkUserId in metadata");
          return new NextResponse("No user ID", { status: 400 });
        }

        // Get the subscription
        const stripeSubscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        // Store subscription in database (you can extend User model or create Subscription model)
        console.log("[STRIPE_WEBHOOK] Subscription created:", {
          clerkUserId,
          subscriptionId: stripeSubscription.id,
          customerId: stripeSubscription.customer,
          status: stripeSubscription.status,
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        });

        // Get customer email and name from Stripe
        const customer = await stripe.customers.retrieve(stripeSubscription.customer as string);
        const customerEmail = (customer as Stripe.Customer).email;
        const customerName = (customer as Stripe.Customer).name || "there";

        // Get plan details
        const priceId = stripeSubscription.items.data[0].price.id;
        const planType = getPlanByPriceId(priceId);
        const plan = planType ? STRIPE_PLANS[planType] : null;

        // Send payment success email
        if (customerEmail && plan) {
          await sendPaymentSuccessEmail({
            to: customerEmail,
            userName: customerName,
            planName: plan.name,
            amount: `$${plan.price / 100}`,
            nextBillingDate: new Date(stripeSubscription.current_period_end * 1000).toLocaleDateString(),
          });
        }

        break;
      }

      case "customer.subscription.updated": {
        // Subscription updated (e.g., plan change, renewal)
        const clerkUserId = subscription.metadata?.clerkUserId;

        if (!clerkUserId) {
          console.error("[STRIPE_WEBHOOK] No clerkUserId in metadata");
          return new NextResponse("No user ID", { status: 400 });
        }

        console.log("[STRIPE_WEBHOOK] Subscription updated:", {
          clerkUserId,
          subscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        });

        // TODO: Update subscription status in database
        break;
      }

      case "customer.subscription.deleted": {
        // Subscription canceled
        const clerkUserId = subscription.metadata?.clerkUserId;

        if (!clerkUserId) {
          console.error("[STRIPE_WEBHOOK] No clerkUserId in metadata");
          return new NextResponse("No user ID", { status: 400 });
        }

        console.log("[STRIPE_WEBHOOK] Subscription canceled:", {
          clerkUserId,
          subscriptionId: subscription.id,
        });

        // TODO: Revoke access in database
        // TODO: Send cancellation email
        break;
      }

      case "invoice.payment_succeeded": {
        // Recurring payment successful
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (subscriptionId) {
          const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
          const clerkUserId = stripeSubscription.metadata?.clerkUserId;

          console.log("[STRIPE_WEBHOOK] Payment succeeded:", {
            clerkUserId,
            subscriptionId,
            amountPaid: invoice.amount_paid / 100,
          });

          // TODO: Send payment confirmation email
        }
        break;
      }

      case "invoice.payment_failed": {
        // Payment failed
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (subscriptionId) {
          const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
          const clerkUserId = stripeSubscription.metadata?.clerkUserId;

          console.log("[STRIPE_WEBHOOK] Payment failed:", {
            clerkUserId,
            subscriptionId,
          });

          // TODO: Send payment failed email
          // TODO: Maybe suspend access after grace period
        }
        break;
      }

      default:
        console.log("[STRIPE_WEBHOOK] Unhandled event type:", event.type);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK] Error processing webhook:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
