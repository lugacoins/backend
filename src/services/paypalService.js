const paypal = require('@paypal/checkout-server-sdk');
const { required } = require('../utils/env');

const environment = () => {
  const mode = process.env.PAYPAL_MODE || 'sandbox';
  const clientId = required('PAYPAL_CLIENT_ID');
  const clientSecret = required('PAYPAL_CLIENT_SECRET');

  if (mode === 'live') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const client = () => new paypal.core.PayPalHttpClient(environment());

const createOrder = async ({ amount, currency }) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount.toFixed(2),
        },
      },
    ],
  });

  const response = await client().execute(request);
  return response.result;
};

const captureOrder = async (orderId) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  const response = await client().execute(request);
  return response.result;
};

module.exports = {
  createOrder,
  captureOrder,
};
