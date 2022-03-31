import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const positions = await prisma.position.findMany({
        where: {
          user: req.body.email       
        }
      })
        await prisma.$disconnect();
        res.status(200).json(positions);
      }