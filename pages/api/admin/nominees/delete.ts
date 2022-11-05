import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../services/Prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string
    try{
      const nominee = await prisma.nominee.delete({
        where: {
          id: id  
        },
      })
      await prisma.$disconnect();
      res.status(200).json(nominee);
    }  
    catch(err){
      await prisma.$disconnect();
      res.status(404).json({msg: `Delete Request Failed`});
    } 
      }
      