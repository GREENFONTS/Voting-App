import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
    try{
      await prisma.position.update({
        data: {
          name: req.body.position,
        },
        where: {
          id: req.query.id
        }
      })
      await prisma.$disconnect();
      res.status(200).json({msg: `Position Updated successfully`});
    }  
    catch(err){
      console.log(err)
      res.status(404).json({msg: `Update Request Failed`});
    } 
      }
      