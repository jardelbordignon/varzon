import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const jwt_secret_key = 'compadrecomprameucocoporquequempoucocococomprapoucocococome'

const generateToken = (user: User) => {
  const { id, name, email, isAdmin } = user
  return jwt.sign(
    { id, name, email, isAdmin },
    jwt_secret_key,
    { expiresIn: '30d' }
  )
}

export default generateToken

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization

  if (authorization) {
    // Bearer xxxxxx - o token irá pegar apenas o hash
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, jwt_secret_key, (error, decode) => {
      if (error) {
        res.status(401).send({ message: 'Token inválido' })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'Token não existe'})
  }
}