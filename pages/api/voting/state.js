import { PrismaClient } from "@prisma/client";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    let state = await prisma.election.findFirst({
            where: {
                user: req.body
            }
        })

        if(state){
        await prisma.$disconnect()
        res.status(200).json({state : state.state})
        }
        else{
        await prisma.$disconnect()
        res.status(404)
        
        
    }    
}
  
  