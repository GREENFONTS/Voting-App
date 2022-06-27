import { prisma } from "../../../services/Prisma"

export default async function handler(req, res) {
    let nominee = JSON.parse(req.query.nominee)
    try{
        await prisma.nominee.update({
            where: {
                id: nominee.id
            },
            data:{
                votes: parseInt(nominee.votes) + 1
            }
        })
        await prisma.$disconnect()
        res.status(200).send({nominee})
    }
    catch(err){
        console.log(err)
        res.status(404).send({msg: "Internal Server Error"})
    }   
}
  
  