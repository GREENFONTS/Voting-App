import { prisma } from "../../../../services/Prisma";
import Position from "../../../../models/positions";

export default async function handler(req, res) {
  const positions : Position[] = await prisma.position.findMany({
    where: {
      user: req.body
    }
  })
    res.status(200).json(positions);
    await prisma.$disconnect();

    
}