import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    console.log(req.body.position)
    const position = await prisma.position.findFirst({
        where: {
          name: req.body.position,
          user: req.body.email       
        }
      })
      if (position != null) {
        res.status(404).json({msg: "Nominee already exists"});
        console.log(position)
      }
      else {
        await prisma.position.create({
          data: {
            name: req.body.position,
            user: req.body.user
          }
        })
        res.status(200).json({msg: `${req.body.position} added successfully`});
      }
      await prisma.$disconnect();
}