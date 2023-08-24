import { RequestHandler } from "express"
import { UserModel } from "../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

let findUser = async function (username: string) {
  let user = await UserModel.findOne({ username: username })
  return user
}

const authController: Record<string, RequestHandler> = {
  login(req, res, next) {
    findUser(req.body.username)
      .then((theUser) => {
        if (theUser) {
          bcrypt
            .compare(req.body.password, theUser.hashedPassword)
            .then((correctPassword) => {
              if (correctPassword) {
                res.json(jwt.sign(JSON.stringify({username: theUser.username}), process.env.SECRETKEY!))
              } else {
                res.json({ error: "Username or Password Incorrect" })
              }
            })
        } else {
          res.json({ error: "Username not found" })
        }
      })
      .catch((err) => {
        console.error(err)
        return next(err)
      })
  },
  register(req, res, next) {
    findUser(req.body.username).then((existingUser) => {
      if (existingUser) {
        res.status(422).json({ message: "Username already taken" })
      } else {
        bcrypt
          .hash(req.body.password, process.env.SALT_ROUNDS!)
          .then((hash) => {
            let user = new UserModel({
              username: req.body.username,
              hashedPassword: hash,
            })
            user.save().then((theUser) => {
              res.status(200).json({ message: "User created" })
            })
          })
          .catch((err) => {
            console.error(err)
            return next(err)
          })
      }
    })
  },
}

export default authController
