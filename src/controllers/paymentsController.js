const paypalService = require('../services/paypalService');
const stripeService = require('../services/stripeService');
const transactionService = require('../services/transactionService');

const createPaypalOrder = async (req, res, next) => {
  try {
    const { amount, currency } = req.validated.body;
    const order = await paypalService.createOrder({ amount, currency });

    await transactionService.createTransaction({
      userId: req.user.sub,
      amount,
      currency,
      type: 'CREDIT',
      status: 'PENDING',
      provider: 'paypal',
      providerRef: order.id,
      metadata: order,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const capturePaypalOrder = async (req, res, next) => {
  try {
    const { orderId } = req.validated.params;
    const result = await paypalService.captureOrder(orderId);
    const status = result.status === 'COMPLETED' ? 'COMPLETED' : 'FAILED';
    const amount = Number(
      result.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value || 0
    );
    const currency =
      result.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.currency_code || 'USD';

    await transactionService.createTransaction({
      userId: req.user.sub,
      amount,
      currency,
      type: 'CREDIT',
      status,
      provider: 'paypal',
      providerRef: orderId,
      metadata: result,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createStripePaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency } = req.validated.body;
    const intent = await stripeService.createPaymentIntent({
      amount,
      currency,
      metadata: { userId: req.user.sub },
    });

    await transactionService.createTransaction({
      userId: req.user.sub,
      amount: amount / 100,
      currency,
      type: 'CREDIT',
      status: 'PENDING',
      provider: 'stripe',
      providerRef: intent.id,
      metadata: intent,
    });

    res.status(201).json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPaypalOrder,
  capturePaypalOrder,
  createStripePaymentIntent,
};
