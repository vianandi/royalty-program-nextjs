import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, tenantName, amount, transactionId } = req.body;

    {/* ============================= Validate input ============================= */}
    if (!userId || !tenantName || !amount || !transactionId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    {/* ============================= Check transaction ID ============================= */}
    const existingTransaction = await prisma.transaction.findUnique({
      where: { transactionId },
    });
    if (existingTransaction) {
      return res.status(400).json({ message: 'Transaction ID is already used' });
    }

    {/* ============================= Transaction Redeem ============================= */}
    const transaction = await prisma.transaction.create({
      data: {
        userId: parseInt(userId),
        tenantName,
        amount: parseInt(amount),
        transactionId,
      },
    });

    {/* ============================= Voucher amount ============================= */}
    if (amount >= 1000000) {
      const voucher = await prisma.voucher.create({
        data: {
          code: `VOUCHER-${Date.now()}`,
          amount: 10000,
          userId: parseInt(userId),
          expiresAt: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), 
        },
      });
      res.status(201).json({ transaction, voucher });
    } else {
      res.status(201).json(transaction);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}