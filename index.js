require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/checkout", async (req, res) => {
  try {
    if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).json({ error: "At least one item with a valid price is required." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      })),
      success_url: `${CLIENT_URL}/success.html`,
      cancel_url: `${CLIENT_URL}/index.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Stripe Checkout Error:", e.message);
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${CLIENT_URL}`);
});