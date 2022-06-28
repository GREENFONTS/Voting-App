import { prisma } from '../../services/Prisma';
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  const {email} = req.query

  const user = await prisma.admin.findUnique({
    where:{
      email: email
    }
  })
  await prisma.$disconnect()

  if (user == null) {
    res.status(404).send( {msg: "Email not found"})
  }
  else {
    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h"
      }
    )
    return res.status(200).send({user, token})
    }
  
}
