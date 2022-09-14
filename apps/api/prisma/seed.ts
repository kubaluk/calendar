import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
const prisma = new PrismaClient();

async function main() {
  const hash = await argon2.hash("password");
  const email = "user@example.com";

  await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      password: hash,
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
