import { prisma } from "../../../services/Prisma";
import User from "../../../models/User";
import ElectionState from "../../../models/ElectionState";

export default async function handler(req, res) {
  let user: User = await prisma.admin.findFirst({
    where: {
      id: req.query.id,
    },
  });
  if (user === undefined) {
    await prisma.$disconnect();
    res.status(404);
  } else {
    let state : ElectionState = await prisma.election.findUnique({
      where: {
        user: user.email,
      },
    });
    if (state) {
      await prisma.$disconnect();
      res.status(200).json({ user: user.email, state });
    } else {
      await prisma.$disconnect();
      res.status(200).json({ user: user.email, state });
    }
  }
}
