const createStripeClient = () => {
  return {
    provider: 'stripe',
    status: 'not-configured'
  };
};

module.exports = { createStripeClient };
