import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
    try{
      await prisma.nominee.updateMany({
        where: {
          name: req.body.currentState.name,
          post: req.body.currentState.post,
          user: req.body.email  
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
      console.log(err)
      res.status(200).json({msg: `Update Request Failed`});
    } 
      }
      