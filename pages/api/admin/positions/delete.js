import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
    try{
      await prisma.position.deleteMany({
        where: {
          name: req.query.position,
          user: req.query.user  
        }
      })
      await prisma.$disconnect();
      res.status(200).json({msg: `${req.query.position} Deleted successfully`});
    }  
    catch(err){
      console.log(err)
      res.status(404).json({msg: `Update Request Failed`});
    } 
      }
      