const Stripe = require('stripe');
const { required } = require('../utils/env');

const stripeClient = () => new Stripe(required('STRIPE_SECRET_KEY'));

const createPaymentIntent = async ({ amount, currency, metadata }) => {
  const intent = await stripeClient().paymentIntents.create({
    amount,
    currency,
    metadata,
  });
  return intent;
};

module.exports = {
  createPaymentIntent,
};
