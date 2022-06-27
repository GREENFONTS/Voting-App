import { prisma } from '../../services/Prisma';
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    let error = []
    const email = req.body.email
    const password = req.body.password

    let user = await prisma.admin.findUnique({
      where: {
        email: email
      }
    })
    await prisma.$disconnect()
      if (user == null) {
        error.push({
          msg: "Email not found"
        });

        res.status(404).send(error)
        error = []
      }
      else if (user.password != password) {
        error.push({
          msg: "password is Incorrect"
        });
        res.status(404).send(error)
        error = []
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
  
  