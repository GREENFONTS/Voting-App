import { prisma } from '../../services/Prisma';
import {NextApiRequest, NextApiResponse} from 'next';
import User from "../../models/User";
const {v4} = require('uuid');
const jwt = require('jsonwebtoken');

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  let email = req.body.email
  let id = v4()
    let user : User = await prisma.admin.findUnique({
        where: {
          email: req.body.email      
        },
      });
  
      if (user != null) {
        res.status(404).send({
          msg: "Admin already exists found"
        })
      }
      else {
        try{
          await prisma.admin.create({
            data: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userName: req.body.userName,
              tel: req.body.tel,
              organization: req.body.organization,
              email: req.body.email,
              password: req.body.password,
              id
            }
          })

          await prisma.election.create({
            data:{
              user: req.body.email,
              state: true
            }
          })
 
          const token = jwt.sign(
            { user_id: id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h"
            }
          )
          await prisma.$disconnect();
          return res.status(200).send({token : token, user : req.body})
        }
        catch(err){
          throw err
        }
      }
  }
  