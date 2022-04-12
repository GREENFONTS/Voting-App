import { PrismaClient } from "@prisma/client";
import middleware from "../../../../middleware";
const {v4 : uuidv4}= require('uuid');
import nextConnect from "next-connect";
import cloudinary from '../../../../config/cloudinary';

const handler = nextConnect() 
handler.use(middleware)
handler.post(async (req,res) => {
    const prisma = new PrismaClient();
    let name = req.body.name[0]
    let position = req.body.position[0]
    let user = req.body.user[0]
    let positionData = JSON.parse(req.body.positions)
    console.log(user)
    
try{
    let filePath = req.files.image[0].path
    const result = await cloudinary.uploader.upload(filePath)
   
    let checkNominee = null
    let positions = []
    positionData.forEach(element => {
      positions.push(element.name)
    });
    
    
       checkNominee  = await prisma.nominee.findMany({
            where: {
            name: name,
            post: position,
            user: user
          }
        });

  
    if (checkNominee.length > 0) {
      res.status(404).send({msg: "Nominee already exists"})
    }
    else {
      await prisma.nominee.create({
        data: {
          name: name,
          post: position,
          user: user,
          image: result.secure_url,
          id: uuidv4(),
          votes: 0,
          postNo: positions.indexOf(position) + 1,
        },
      });
      await prisma.$disconnect();
      res.status(200).send({msg: "Nominee created successfully"})
    }

  }
  catch(err){
    res.status(404).send({msg: "Nominee creation request failed"})
  }
  
})

export const config = {
  api: {
     bodyParser : false
  }
}
export default handler