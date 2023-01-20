import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = JSON.parse(req.body) as { user: string };
  const codes = await prisma.coupons.findMany({
    where: {
      user: user.user,
      used: false,
    },
  });
  // console.log(codes)
  await prisma.$disconnect();
  res.status(200).json(codes);
}
