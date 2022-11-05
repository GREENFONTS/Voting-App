import nextConnect from 'next-connect';
import multiparty from 'multiparty';
import { NextApiRequest } from 'next';

const middleware = nextConnect()

middleware.use(async (req : NextApiRequest, res, next) => {
    const form = new multiparty.Form()
    
    try {
        await form.parse(req, (err, fields, files) => {
            req.body = fields
            req.body.file = files
            next()
        })
    } catch (error) {
        console.log(error)
    }
    
})

export default middleware;