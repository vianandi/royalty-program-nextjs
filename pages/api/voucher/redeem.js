import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, voucherCode } = req.body;

    // Validate input
    if (!userId || !voucherCode) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find voucher
    const voucher = await prisma.voucher.findUnique({
      where: { code: voucherCode },
    });

    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found.' });
    }

    if (voucher.status !== 'Unused') {
      return res.status(400).json({ message: 'Voucher already used.' });
    }

    if (new Date(voucher.expiry) < new Date()) {
      return res.status(400).json({ message: 'Voucher expired.' });
    }

    // Redeem voucher
    await prisma.voucher.update({
      where: { code: voucherCode },
      data: { status: 'Used' },
    });

    res.status(200).json({ message: 'Voucher redeemed successfully.' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}