import { prisma } from "../../../services/Prisma";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let email : string = req.body
    console.log(email)
    try{
        await prisma.nominee.updateMany({
            where: {
                user: email
            },
            data:{
                votes: 0
            }
        })
        await prisma.$disconnect()
        res.status(200).send({msg: 'success'})
    }
    catch(err){
        await prisma.$disconnect()
        res.status(404).send({msg: "Internal Server Error"})
    }   
}
  
  