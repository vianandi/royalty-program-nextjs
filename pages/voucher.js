import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
      const vouchers = await prisma.voucher.findMany({
        where: { userId: parseInt(userId, 10) },
      });

      res.status(200).json(vouchers);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}