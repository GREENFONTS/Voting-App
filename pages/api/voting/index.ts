import { prisma } from "../../../services/Prisma";
import User from "../../../models/auth/User";
import ElectionState from "../../../models/election/ElectionState";
import { NextApiRequest, NextApiResponse } from "next";
import Nominee from "../../../models/election/Nominee";
import Position from "../../../models/election/positions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let id = req.query.id as string;
  let user: User = await prisma.admin.findFirst({
    where: {
      id: id,
    },
  });
  if (user === undefined) {
    await prisma.$disconnect();
    res.status(404);
  } else {
    let state: ElectionState = await prisma.election.findUnique({
      where: {
        user: user.email,
      },
    });

    let nominees: Nominee[] = await prisma.nominee.findMany({
      where: {
        user: user.email,
      },
    });

    let positions: Position[] = await prisma.position.findMany({
      where: {
        user: user.email,
      },
    });


    await prisma.$disconnect();
    res.status(200).json({ user: user.email, state: state.state, nominees, positions });
  }
}
