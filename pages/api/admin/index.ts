import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/auth/User";
import Code from "../../../models/election/Codes";
import Nominee from "../../../models/election/Nominee";
import Position from "../../../models/election/positions";
import ensureAuthenticated from "../../../services/auth";
import { prisma } from "../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token;
  const response = await ensureAuthenticated(token);
  if (response === undefined || null) {
    res.status(403).send({ msg: "Token is invalid or expired" });
  } else {
    let user: User = await prisma.admin.findUnique({
      where: {
        email: response.email,
      },
    });

    let positions : Position[] = await prisma.position.findMany({
      where: {
        user: user.email
      }
    })

    let nominees : Nominee[] = await prisma.nominee.findMany({
      where: {
        user: user.email
      }
    })

    let codes : Code[] = await prisma.coupons.findMany({
      where: {
        user: user.email
      }
    })
    await prisma.$disconnect();
    res.status(200).send({user, positions, nominees, codes});
  }
}
