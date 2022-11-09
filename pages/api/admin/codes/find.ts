import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.user);
  const codes = await prisma.coupons.findMany({
    where: {
      user: req.body.user,
      used: false,
    },
  });
  //console.log(codes)
  await prisma.$disconnect();
  res.status(200).json(codes);
}
