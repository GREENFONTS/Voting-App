import { prisma } from "../../../../services/Prisma";

export default async function handler(req, res) {
  if(req.body != null || req.body != undefined){
    const codes = await prisma.coupons.findMany({
      where:{
      user: req.body,
      used: false
      }
    })
      await prisma.$disconnect();
      res.status(200).json(codes);
   }
}