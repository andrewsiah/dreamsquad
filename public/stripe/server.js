const stripe = require('stripe')('sk_test_51HqvN8IyLcOpmiJjqQf8IRoeZdcbgQuWtTnm8jpDPqJlY1B6EkB5J5GDM2uAMNZ0q3Om7HcfCmoE3I8gbizuivdL00XRKJIV73');
const express = require('express');
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'myr',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));