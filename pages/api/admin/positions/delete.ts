import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../services/Prisma";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  const id = req.query.id as string
    try{
      const position = await prisma.position.delete({
        where: {
          id: id 
        }
      })

      await prisma.$disconnect();
      res.status(200).json(position);
    }  
    catch(err){
      console.log(err)
      res.status(404).json({msg: `Update Request Failed`});
    } 
      }
      