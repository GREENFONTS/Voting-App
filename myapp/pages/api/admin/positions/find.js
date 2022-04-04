import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  console.log(req.body)
 if(req.body.user != null || req.body.user != undefined){
   console.log(req.body.user)
  const positions = await prisma.position.findMany({
    where: {
      user: req.body.user.email      
    }
  })
    await prisma.$disconnect();
    res.status(200).json(positions);
 }
    
      }