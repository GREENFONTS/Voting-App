import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
    const nominees = await prisma.nominee.findMany({
        where: {
          user: req.body.email       
        }
      })
        await prisma.$disconnect();
        res.status(200).json(nominees);
      }