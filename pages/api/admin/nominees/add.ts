import { prisma } from "../../../../services/Prisma";
import middleware from "../../../../middleware";
const { v4: uuidv4 } = require("uuid");
import nextConnect from "next-connect";
import cloudinary from "../../../../config/cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateNomineeData } from "../../../../models/election/Nominee";

const handler = nextConnect();
handler.use(middleware);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, post, user } = req.body as CreateNomineeData;

  try {
    let filePath = req.body.file.image[0].path;
    const result = await cloudinary.uploader.upload(filePath);

    let checkNominee = null;
    let positions = await prisma.position.findMany({
      where: {
        user: user[0],
      },
    });

    let position = positions.filter((ele) => ele.name === post[0])[0];

    checkNominee = await prisma.nominee.findMany({
      where: {
        name: name[0],
        post: post[0],
        user: user[0],
      },
    });

    if (checkNominee.length > 0) {
      res.status(404).send({ msg: "Nominee already exists" });
    } else {
      await prisma.nominee.create({
        data: {
          name: name[0],
          post: post[0],
          user: user[0],
          image: result.secure_url,
          id: uuidv4(),
          votes: 0,
          postNo: positions.indexOf(position) + 1,
        },
      });
      await prisma.$disconnect();
      res.status(201).send({ msg: "Nominee created successfully" });
    }
  } catch (err) {
    res.status(404).send({ msg: "Nominee creation request failed" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
