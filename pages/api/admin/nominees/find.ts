import { NextApiRequest, NextApiResponse } from "next";
import Nominee from "../../../../models/Nominee";
import { prisma } from "../../../../services/Prisma";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if(req.body != null || req.body != undefined){
    const nominees : Nominee[] = await prisma.nominee.findMany({
      where:{
      user: req.body
      }
    })
      await prisma.$disconnect();
      res.status(200).json(nominees);
   }
}