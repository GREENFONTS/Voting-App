import { prisma } from '../../../services/Prisma';
import ElectionState from '../../../models/election/ElectionState';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        let state: ElectionState = await prisma.election.findFirst({
            where:{
                user: req.body
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

  
  