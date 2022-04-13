import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if(req.body != null || req.body != undefined){
    const nominees = await prisma.nominee.findMany({
      where:{
      user: req.body
      }
    })
      await prisma.$disconnect();
      res.status(200).json(nominees);
   }
}