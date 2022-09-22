import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
const prisma = new PrismaClient();

async function main() {
  const hash = await argon2.hash("password");

  const emails = ["user@example.com", "user1@example.com"];

  emails.forEach(
    async (email) =>
      await prisma.user.upsert({
        where: { email: email },
        update: {},
        create: {
          email: email,
          password: hash,
        },
      }),
  );

  await prisma.calendar.upsert({
    where: { id: 1 },
    update: {},
    create: {
      ownerId: 1,
    },
  });

  await prisma.calendar.upsert({
    where: { id: 2 },
    update: {},
    create: {
      ownerId: 2,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
