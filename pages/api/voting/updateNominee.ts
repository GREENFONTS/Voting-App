import { prisma } from "../../../services/Prisma";
import {  NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let id = req.query.id as string
    let votes = req.query.votes as string
    try{
        let nominee = await prisma.nominee.update({
            where: {
                id: id
            },
            data:{
                votes: parseInt(votes) + 1
            }
        })
        await prisma.$disconnect()
        res.status(201).send(nominee)
    }
    catch(err){
        console.log(err)
        res.status(404).send({msg: "Internal Server Error"})
    }   
}
  
  