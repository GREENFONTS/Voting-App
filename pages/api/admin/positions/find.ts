import { prisma } from "../../../../services/Prisma";
import Position from "../../../../models/election/positions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  const User = req.query.user as string

  const positions : Position[] = await prisma.position.findMany({
    where: {
      user: User
    }
  })
    res.status(200).json(positions);
    await prisma.$disconnect();

    
}