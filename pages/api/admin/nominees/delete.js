import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
    try{
      await prisma.nominee.deleteMany({
        where: {
          name: req.query.name,
          post: req.query.position,
          user: req.query.user  
        }
      })
      await prisma.$disconnect();
      res.status(200).json({msg: `Nominee Deleted successfully`});
    }  
    catch(err){
      await prisma.$disconnect();
      res.status(404).json({msg: `Update Request Failed`});
    } 
      }
      