import { PrismaClient } from '@/lib/generated/prisma/client';

// const prisma = new PrismaClient();

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
