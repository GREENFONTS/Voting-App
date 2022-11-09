import { prisma } from "../../../services/Prisma";
import Code from "../../../models/election/Codes";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let code = req.query.code as string;
  let email = req.query.email as string;

  let codeData: Code[] = await prisma.coupons.findMany({
    where: {
      user: email,
      codes: code,
    },
  });

  if (codeData.length == 0) {
    await prisma.$disconnect();
    res.status(404).send({ msg: "Code is invalid" });
  } else if (codeData[0].used) {
    await prisma.$disconnect();
    res.status(404).send({ msg: "Code has been used" });
  } else {
    await prisma.coupons.updateMany({
      where: {
        codes: codeData[0].codes,
        user: email,
      },
      data: {
        used: true,
      },
    });
    const token = jwt.sign(
      { code_id: codeData[0].codes, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    await prisma.$disconnect();
    res.status(200).json(token);
  }
}
