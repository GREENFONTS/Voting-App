import { prisma } from "../../../services/Prisma";
import ElectionState from "../../../models/ElectionState";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let state: ElectionState = await prisma.election.findFirst({
    where: {
      user: req.body,
    },
  });

  if (state) {
    await prisma.$disconnect();
    res.status(200).json({ state: state.state });
  } else {
    await prisma.$disconnect();
    res.status(404);
  }
}
