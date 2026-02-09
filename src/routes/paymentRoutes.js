const express = require('express');
const { z } = require('zod');
const paymentsController = require('../controllers/paymentsController');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

const createPaypalSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    currency: z.string().length(3).default('USD'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const capturePaypalSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    orderId: z.string().min(5),
  }),
  query: z.object({}).optional(),
});

const createStripeSchema = z.object({
  body: z.object({
    amount: z.number().int().positive(),
    currency: z.string().length(3).default('usd'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

router.post(
  '/paypal/orders',
  authMiddleware,
  validate(createPaypalSchema),
  paymentsController.createPaypalOrder
);
router.post(
  '/paypal/orders/:orderId/capture',
  authMiddleware,
  validate(capturePaypalSchema),
  paymentsController.capturePaypalOrder
);
router.post(
  '/stripe/payment-intents',
  authMiddleware,
  validate(createStripeSchema),
  paymentsController.createStripePaymentIntent
);

module.exports = router;
