import { NextApiRequest, NextApiResponse } from "next";
import Position from "../../../../models/positions";
import { prisma } from "../../../../services/Prisma";
const {v4} = require('uuid');

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const position : Position = await prisma.position.findFirst({
        where: {
          name: req.body.position,
          user: req.body.user      
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
            name: req.body.position,
            user: req.body.user
          }
        })
        await prisma.$disconnect();
        res.status(200).json({msg: `${req.body.position} added successfully`});
      }   
}