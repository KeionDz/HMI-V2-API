import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';
import { Roles } from '../src/generated/prisma/enums';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: databaseUrl,
  }),
});

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME ?? 'admin';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'admin123';
  const name = process.env.SEED_ADMIN_NAME ?? 'Admin';
  const hashedPassword = await hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { username },
    update: {
      name,
      password: hashedPassword,
      role: Roles.ADMIN,
    },
    create: {
      name,
      username,
      password: hashedPassword,
      role: Roles.ADMIN,
    },
  });

  console.log(`Seeded admin user: ${admin.username}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
