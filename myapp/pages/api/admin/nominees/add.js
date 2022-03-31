import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const formidable = require('formidable-serverless');
const upload = require('../../../../services/multer');
const cloudinary = require('../../../../config/cloudinary')

export default async function handler(req, res) {
    console.log(req.body.image)

    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        console.log('reachedd')
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
      console.log(fields, files)
    });
}