import { prisma } from '../../services/Prisma';
import {NextApiRequest, NextApiResponse} from 'next';
import User from "../../models/User";
const jwt = require('jsonwebtoken');

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    const email :string = req.body.email
    const password : string = req.body.password

    let user: User = await prisma.admin.findUnique({
      where: {
        email: email
      }
    })
    await prisma.$disconnect();
      if (user == null) {
        res.status(404).send({
          msg: "Email not found"
        })
      }
      else if (user.password != password) {
        res.status(404).send({
          msg: "password is Incorrect"
        })
      }
      
      else {
        const token = jwt.sign(
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h"
          }
        )
        return res.status(200).send({token : token, user : user})
        }
    
    }
  
  