import { prisma } from "../../../services/Prisma"
export default async function handler(req, res) {
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
  
  