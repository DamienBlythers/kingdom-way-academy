import { NextResponse } from "next/server";
import { auth } from "@/lib/clerk-auth-helper";
import { stripe } from "@/lib/stripe";
import { STRIPE_PLANS } from "@/lib/stripe-plans";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { planType } = await req.json();

    if (!planType || !(planType in STRIPE_PLANS)) {
      return NextResponse.json(
        { error: "Invalid plan type" },
        { status: 400 }
      );
    }

    const plan = STRIPE_PLANS[planType as keyof typeof STRIPE_PLANS];

    // Get or create Stripe customer
    let customer;
    
    // Search for existing customer by email
    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name,
        metadata: {
          clerkUserId: session.user.id,
        },
      });
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        clerkUserId: session.user.id,
        planType: planType,
      },
      subscription_data: {
        metadata: {
          clerkUserId: session.user.id,
          planType: planType,
        },
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
