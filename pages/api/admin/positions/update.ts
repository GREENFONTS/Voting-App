import { NextApiRequest, NextApiResponse } from "next";
import Position from "../../../../models/election/positions";
import { prisma } from "../../../../services/Prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {name, id} = JSON.parse(req.body) as Position
    try{
      await prisma.position.update({
        data: {
          name: name,
        },
        where: {
          id: id
        }
      })
      await prisma.$disconnect();
      res.status(201).json({msg: `Position Updated successfully`});
    }  
    catch(err){
      console.log(err)
      res.status(404).json({msg: `Update Request Failed`});
    } 
      }
      