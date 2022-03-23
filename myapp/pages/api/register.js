const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const {v4} = require('uuid');

export default async function handler(req, res) {
    let error = []
  
    let user = await prisma.admin.findUnique({
        where: {
          email: req.body.email      
        },
      });
  
      if (user != null) {
        error.push({
          msg: "Admin already exists found"
        })  
        res.status(404).send(error)
        error = []
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
              id: v4()
            }
          })
          await prisma.$disconnect();
          return res.status(200).send({msg: 'Admin created successfully' , user : req.body})
        }
        catch(err){
          throw err
        }
      }
  }
  