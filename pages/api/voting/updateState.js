import { PrismaClient } from "@prisma/client";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    try{
        await prisma.election.update({
            where: {
                user: req.body.user
            },
            data: {
                state: false
            }
        })

        
        await prisma.$disconnect()
        res.status(200)
    }
    catch(err){
        await prisma.$disconnect()
        res.status(404)
    }
      
        
        
    }    

  
  