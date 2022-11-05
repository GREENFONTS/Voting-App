import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../services/Prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.query.user as string
    try{
      await prisma.nominee.deleteMany({
        where: {
          user: user
        }
      })
      await prisma.$disconnect();
      res.status(200).json({msg: `All Nominees Deleted successfully`});
    }  
    catch(err){
      console.log(err)
      res.status(404).json({msg: `Delete Request Failed`});
    } 
      }
      