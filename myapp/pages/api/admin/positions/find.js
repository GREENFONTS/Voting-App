import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
 if(req.body != null || req.body != undefined){
  const positions = await prisma.position.findMany({
    where: {
      user: req.body.user
    }
  })
    res.status(200).json(positions);
    await prisma.$disconnect();
 }
    
      }