const { PrismaClient } = require("@prisma/client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const prisma = new PrismaClient();

const paymentGateway = async (req, res) => {
  const { products, order_id } = req.body;
  const line_items = products.map((product) => ({
    price_data: {
      currency: "pkr",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.BASE_URL}/history`,
    cancel_url: `${process.env.BASE_URL}/history`,
  });

  if (session) {
    await prisma.order.update({
      where: {
        ID: order_id,
      },
      data: {
        status: true,
      },
    });
  }

  console.log(session);

  res.json({
    id: session.id,
  });
};

module.exports = {
  paymentGateway,
};
