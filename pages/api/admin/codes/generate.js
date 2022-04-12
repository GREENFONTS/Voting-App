import { PrismaClient } from "@prisma/client";
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    let number = parseInt(req.body.number)
    let codeList = []
    try{
        for(let i = 0; i < number; i++){
            codeList.push({codes: nanoid(12), user: req.body.user.email, used: false})
             
         }
     
           await prisma.coupons.createMany({
             data: codeList,
           });
           await prisma.$disconnect();
           res.status(200).send({msg: "Codes created successfully"})

    }
    catch(err){
       await prisma.$disconnect();
        res.status(404).send({msg: "Code Generation Request Unsuccessful"})

    }
    
}