import { PrismaClient } from "@prisma/client";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  const prisma = new PrismaClient();
    let error = []
    const code = req.query.code
    const email = req.query.user

    let positions = await prisma.position.findMany({
        where: {
            user: email
        }
    })
    let nominees = await prisma.nominee.findMany({
        where: {
            user: email
        }
    })
    let codeData = await prisma.coupons.findMany({
        where: {
            user: email,
            codes: code
        }
    })

      if (codeData.length == 0) {
        await prisma.$disconnect()
        res.status(404).send({msg: 'Code is invalid'})
      }
      else if (codeData[0].used) {
        await prisma.$disconnect()
        res.status(404).send({msg: 'Code has been used'})
      }
      else {
        await prisma.coupons.updateMany({
            where: {
                codes: codeData[0].codes, 
                user: email
            },
            data: {
                used: true
            }
        })
        const token = jwt.sign(
          { code_id: codeData[0].codes, email},
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h"
          }
        )
        await prisma.$disconnect()
        res.status(200).json({token, positions: positions, nominees: nominees})
    
    }
}
  
  