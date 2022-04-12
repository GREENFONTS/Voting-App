import { PrismaClient } from "@prisma/client";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    try{

        let state = await prisma.election.findFirst({
            where:{
                user: req.body.user
            }
        })
        
        await prisma.election.update({
            where: {
                user: req.body
            },
            data: {
                state: !state.state
            }
        })

        
        await prisma.$disconnect()
        res.status(200).send(state)
    }
    catch(err){
        console.log(err)
        await prisma.$disconnect()
        res.status(404).send(err)
    }     
    }    

  
  