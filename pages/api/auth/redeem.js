import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, voucherCode } = req.body;

    {/* ============================= Validate input ============================= */}
    if (!userId || !voucherCode) {
      return res.status(400).json({ message: 'User ID and voucher code are required' });
    }

    try {
      const voucher = await prisma.voucher.findUnique({
        where: { code: voucherCode },
      });

      if (!voucher) {
        return res.status(404).json({ message: 'Voucher not found' });
      }

      if (voucher.isRedeemed) {
        return res.status(400).json({ message: 'Voucher already redeemed' });
      }

      if (new Date(voucher.expiresAt) < new Date()) {
        return res.status(400).json({ message: 'Voucher expired' });
      }

      await prisma.voucher.update({
        where: { code: voucherCode },
        data: { isRedeemed: true },
      });

      res.status(200).json({ message: 'Voucher redeemed successfully' });
    } catch (error) {
      console.error('Error redeeming voucher:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}