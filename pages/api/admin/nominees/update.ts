import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../../../middleware";
import { UpdateNomineeData } from "../../../../models/election/Nominee";
import { prisma } from "../../../../services/Prisma";
import cloudinary from "../../../../config/cloudinary";

const handler = nextConnect();
handler.use(middleware);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, post, id } = req.body as UpdateNomineeData;
  try {
    let filePath = req.body.file.image[0].path;
    const result = await cloudinary.uploader.upload(filePath);

    await prisma.nominee.update({
      where: {
        id: id[0],
      },
      data: {
        name: name[0],
        post: post[0],
        image: result.secure_url,
      },
    });
    await prisma.$disconnect();
    res.status(200).json({ msg: `Nominee Updated successfully` });
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    res.status(200).json({ msg: `Update Request Failed` });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
