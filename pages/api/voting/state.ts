import { prisma } from "../../../services/Prisma";
import ElectionState from '../../../models/election/ElectionState';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {user} = JSON.parse(req.body)
  let state: ElectionState = await prisma.election.findFirst({
    where: {
      user: user,
    },
  });

  if (state) {
    await prisma.$disconnect();
    res.status(200).json(state.state);
  } else {
    await prisma.$disconnect();
    res.status(404);
  }
}
