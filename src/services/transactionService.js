const prisma = require('../config/db');

const createTransaction = async ({
  userId,
  amount,
  currency,
  type,
  status,
  provider,
  providerRef,
  metadata,
}) =>
  prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.create({
      data: {
        userId,
        amount,
        currency,
        type,
        status,
        provider,
        providerRef,
        metadata,
      },
    });

    if (status === 'COMPLETED' && type === 'CREDIT') {
      await tx.wallet.update({
        where: { userId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });
    }

    return transaction;
  });

module.exports = {
  createTransaction,
};
