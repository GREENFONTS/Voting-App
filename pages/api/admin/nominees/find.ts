import { NextApiRequest, NextApiResponse } from "next";
import Nominee from "../../../../models/election/Nominee";
import { prisma } from "../../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.query.user as string;

  const nominees: Nominee[] = await prisma.nominee.findMany({
    where: {
      user: user,
    },
  });

  await prisma.$disconnect();
  res.status(200).json(nominees);
}
