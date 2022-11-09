import { prisma } from "../../../services/Prisma";
import ElectionState from "../../../models/election/ElectionState";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {user} = JSON.parse(req.body) 
  try {
    
    let state: ElectionState = await prisma.election.findFirst({
      where: {
        user: user,
      },
    });

    await prisma.election.update({
      where: {
        user: user,
      },
      data: {
        state: !state.state,
      },
    });

    await prisma.$disconnect();
    res.status(201).send(state.state);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(404).send(err);
  }
}
