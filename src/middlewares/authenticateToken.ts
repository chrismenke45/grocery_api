import jwt from 'jsonwebtoken'
import { RequestHandler } from "express"


const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET!, (err: any, user: any) => {
    console.error(err)

    if (err) return res.sendStatus(403)

    req.current_user = user

    next()
  })
}
export default authenticateToken