import { NextApiRequest, NextApiResponse } from "next";
import Position from "../../../../models/election/positions";
import { prisma } from "../../../../services/Prisma";
const {v4} = require('uuid');

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  const {name, user} = JSON.parse(req.body) as Position
    const position : Position = await prisma.position.findFirst({
        where: {
          name: name,
          user: user     
        }
      })
      if (position != null) {
        res.status(404).json({msg: "Nominee already exists"});
        await prisma.$disconnect();
      }
      else {
        await prisma.position.create({
          data: {
            id: v4(),
            name: name,
            user: user
          }
        })
        await prisma.$disconnect();
        res.status(201).json({msg: `${name} added successfully`});
      }   
}