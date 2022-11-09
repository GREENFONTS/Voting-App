// import { prisma } from "../../services/Prisma";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { LoginData } from "../../models/auth/RequestModels";
import User from "../../models/auth/User";
const jwt = require("jsonwebtoken");

import {prisma} from "../../services/Prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {email, password} = JSON.parse(req.body) as LoginData;
  let user: User = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });
  await prisma.$disconnect();
  if (user == null) {
    res.status(404).send({
      msg: "Combination of Email and Password is Incorrect",
    });
  } else if (user.password != password) {
    res.status(404).send({
      msg: "Combination of Email and Password is Incorrect",
    });
  } else {
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "4h",
    });
    return res.status(200).send({ token: token, user: user });
  }
}
