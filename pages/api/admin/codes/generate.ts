import { prisma } from "../../../../services/Prisma";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import Code, { CreateCodesData } from "../../../../models/election/Codes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { number, user } = JSON.parse(req.body) as CreateCodesData;
  let codeList: Code[] = [];
  try {
    for (let i = 0; i < number; i++) {
      codeList.push({ codes: nanoid(12), user: user, used: false });
    }

    await prisma.coupons.createMany({
      data: codeList,
    });

    await prisma.$disconnect();
    res.status(201).send({ msg: "Codes created successfully" });
  } catch (err) {
    await prisma.$disconnect();
    res.status(404).send({ msg: "Code Generation Request Unsuccessful" });
  }
}
