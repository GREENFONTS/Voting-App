import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const position = await prisma.position.findFirst({
        where: {
          name: req.body.position,
          user: req.body.email       
        }
      })
      if (position != null) {
        res.status(404).json({msg: "Nominee already exists"});
      }
      else {
        await prisma.position.create({
          data: {
            name: req.body.position,
            user: req.body.user
          }
        })
        await prisma.$disconnect();
        res.status(200).json({msg: `${req.body.position} added successfully`});
      }
     
}