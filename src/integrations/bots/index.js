const tradingBotsRegistry = {
  status: 'not-configured',
  bots: []
};

const registerBot = (botConfig) => {
  tradingBotsRegistry.bots.push(botConfig);
  return tradingBotsRegistry;
};

module.exports = {
  tradingBotsRegistry,
  registerBot
};
