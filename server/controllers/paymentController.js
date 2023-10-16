const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentGateway = async (_, res) => {
  const customer = await stripe.customers.create();

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2023-08-16" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: "usd",
    customer: customer.id,
    payment_method_types: ["card"],
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
  });
};

module.exports = {
  paymentGateway,
};
