import { prisma } from "../../../../services/Prisma";

export default async function handler(req, res) {
  const positions = await prisma.position.findMany({
    where: {
      user: req.body
    }
  })
    res.status(200).json(positions);
    await prisma.$disconnect();

    
}