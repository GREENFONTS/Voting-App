import { NextApiRequest, NextApiResponse } from 'next';
import ensureAuthenticated from '../../../services/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.query.token as string
    const verifyToken = await ensureAuthenticated(token)
    if(verifyToken === undefined || null){
        res.status(403).send({msg: 'Token is invalid or expired'})
    }else{
        res.status(200).send(verifyToken)
    }

}
  