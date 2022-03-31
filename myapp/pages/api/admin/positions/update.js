import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    try{
      await prisma.position.update({
        data: {
          name: req.body.position,
        },
        where: {
          name: req.body.positionName,
          user: req.body.email  
        }
      })
      await prisma.$disconnect();
      res.status(200).json({msg: `${req.body.positionName} Updated successfully`});
    }  
    catch(err){
      console.log(err)
      res.status(200).json({msg: `Update Request Failed`});
    } 
      }
      