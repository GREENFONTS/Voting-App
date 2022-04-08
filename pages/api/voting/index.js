import { PrismaClient } from "@prisma/client";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const prisma = new PrismaClient()

   let user = await prisma.admin.findMany({
       where:{
           id: req.query.id
       }
})
    if(user === undefined){
        await prisma.$disconnect()
        res.status(404)
    }else{
        await prisma.$disconnect()
        res.status(200).json({user: user[0].email})
    }    
}
  
  