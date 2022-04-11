import nextConnect from 'next-connect';
import multiparty from 'multiparty';


const middleware = nextConnect()

middleware.use(async (req, res, next) => {
    const form = new multiparty.Form()

    await form.parse(req, (err, fields, files) => {
        req.body = fields
        req.files = files
        next()
    })
})

export default middleware