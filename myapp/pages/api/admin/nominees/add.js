import { PrismaClient } from "@prisma/client";
const {v4 : uuidv4}= require('uuid')

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    let checkNominee = null
    let positions = req.body.positions
    try{
       checkNominee  = await prisma.nominee.findMany({
            where: {
            name: req.body.name,
            post: req.body.position,
            user: req.body.user.email
          }
        });

    }
  catch(err){
      console.log(err)
  }
  
    if (checkNominee.length > 0) {
      res.status(404).send({msg: "Nominee already exists"})
    }
    else {
      await prisma.nominee.create({
        data: {
          name: req.body.name,
          post: req.body.position,
          user: req.body.user.email,
          id: uuidv4(),
          votes: 0,
          postNo: positions.indexOf(req.body.post) + 1,
        },
      });
      await prisma.$disconnect();
      res.status(200).send({msg: "Nominee created successfully"})
    }
}