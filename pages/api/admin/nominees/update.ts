import { NextApiRequest, NextApiResponse } from "next";
import { UpdateNomineeData } from "../../../../models/election/Nominee";
import { prisma } from "../../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, position, id } = JSON.parse(req.body) as UpdateNomineeData;
  try {
    await prisma.nominee.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        post: position,
      },
    });
    await prisma.$disconnect();
    res.status(200).json({ msg: `Nominee Updated successfully` });
  } catch (err) {
    await prisma.$disconnect();
    res.status(200).json({ msg: `Update Request Failed` });
  }
}
