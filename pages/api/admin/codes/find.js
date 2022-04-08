import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if(req.body != null || req.body != undefined){
    const codes = await prisma.coupons.findMany({
      where:{
      user: req.body.user,
      used: false
      }
    })
      await prisma.$disconnect();
      res.status(200).json(codes);
   }
}