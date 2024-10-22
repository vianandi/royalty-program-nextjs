import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, tenantName, amount, transactionId } = req.body;

    // Validate input
    if (!userId || !tenantName || !amount || !transactionId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Check if transaction ID is unique
      const existingTransaction = await prisma.transaction.findUnique({
        where: { transactionId },
      });
      if (existingTransaction) {
        return res.status(400).json({ message: 'Transaction ID already used.' });
      }

      // Create transaction
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          tenantName,
          amount,
          transactionId,
        },
      });

      // Award voucher if amount is 1,000,000 or more
      if (amount >= 1000000) {
        const voucher = await prisma.voucher.create({
          data: {
            code: `VOUCHER-${Date.now()}`,
            amount: 10000,
            expiry: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), // 3 months from now
            userId,
          },
        });
        return res.status(201).json({ transaction, voucher });
      }

      res.status(201).json({ transaction });
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}