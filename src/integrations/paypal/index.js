const createPayPalClient = () => {
  return {
    provider: 'paypal',
    status: 'not-configured'
  };
};

module.exports = { createPayPalClient };
