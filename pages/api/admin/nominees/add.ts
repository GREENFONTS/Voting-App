import { prisma } from "../../../../services/Prisma";
import middleware from "../../../../middleware";
const {v4 : uuidv4}= require('uuid');
import nextConnect from "next-connect";
import cloudinary from '../../../../config/cloudinary';
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect() 
handler.use(middleware)
handler.post(async (req:NextApiRequest,res:NextApiResponse) => {
    let name = req.body.name[0]
    let position = req.body.position[0]
    let user = req.body.user[0]
    let positionData = JSON.parse(req.body.positions)
    
try{
    let filePath = req.body.file.image[0].path
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