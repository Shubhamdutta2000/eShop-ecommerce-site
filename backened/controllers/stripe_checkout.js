import stripe from "stripe";

const Stripe = stripe(
  "sk_test_51I5RESIXupbB69925kSlzIjvRXVNHipWNu4GZPsxsQRrRv2o3qhI3dPP1BXhILgg6Wbm1WtyPvhrg6SWr05ctsoH00gW8UIIW8"
);

const YOUR_DOMAIN = "http://localhost:3000";

export const stripe_checkout = async (req, res) => {
  try {
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",

            product_data: {
              name: "Stubborn Attachments",
              images: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
              ],
            },
            unit_amount: req.body.totalPrice,
          },
          quantity: 4,
        },
      ],

      customer_email: req.body.email,

      payment_intent_data: {
        shipping: {
          address: {
            line1: req.body.line1,
            line2: req.body.line2,
            city: req.body.city,
            country: req.body.country,
            postal_code: req.body.postal_code,
          },
          name: req.body.name,
        },
      },
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/orders/${req.body.orderId}?success=true`,
      cancel_url: `${YOUR_DOMAIN}/orders/${req.body.orderId}?canceled=true`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log(error.message);
  }
};
