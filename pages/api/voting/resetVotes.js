import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    let user = req.body
    try{
        await prisma.nominee.updateMany({
            where: {
                user: user
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
  
  