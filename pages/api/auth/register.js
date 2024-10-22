// pages/api/auth/register.js

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, cellphone } = req.body;

    // Validate input
    if (!name || !email || !password || !cellphone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cellphone,
      },
    });

    res.status(201).json(user);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}