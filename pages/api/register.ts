import { prisma } from "../../services/Prisma";
import { NextApiRequest, NextApiResponse } from "next";
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
import User from "../../models/auth/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userData = JSON.parse(req.body) as User;
  userData.id = v4();
  let user: User = await prisma.admin.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (user != null) {
    res.status(404).send({
      msg: "Admin already exists found",
    });
  } else {
    try {
      await prisma.admin.create({
        data: userData,
      });

      await prisma.election.create({
        data: {
          user: userData.email,
          state: true,
        },
      });

      const token = jwt.sign(
        { user_id: userData.id, email: userData.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      await prisma.$disconnect();
      return res.status(200).send({ token: token, user: req.body });
    } catch (err) {
      throw err;
    }
  }
}
