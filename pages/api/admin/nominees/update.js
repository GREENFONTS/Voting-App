import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
    try{
      await prisma.nominee.update({
        where: {
          id: req.query.id 
        },
        data: {
          name: req.body.name,
          post: req.body.position
        }
        
      })
      await prisma.$disconnect();
      res.status(200).json({msg: `Nominee Updated successfully`});
    }  
    catch(err){
      await prisma.$disconnect();
      res.status(200).json({msg: `Update Request Failed`});
    } 
      }
      