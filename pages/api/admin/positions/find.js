import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  const positions = await prisma.position.findMany({
    where: {
      user: req.body
    }
  })
    res.status(200).json(positions);
    await prisma.$disconnect();

    
}