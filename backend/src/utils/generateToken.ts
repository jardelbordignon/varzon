import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const jwt_secret_key = 'compadrecomprameucocoporquequempoucocococomprapoucocococome'
 
interface DecodeProps {
  id: number
  name: string
  email: string
  isAdmin: boolean
  isSeller: boolean
  iat: number
  exp: number
}

const generateToken = (user: User) => {
  const { id, name, email, isAdmin, isSeller } = user
  return jwt.sign(
    { id, name, email, isAdmin, isSeller },
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
        req.user = decode as DecodeProps
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'Token não existe'})
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin)
    next()
  else
    res.status(401).send({ message: 'Token não é de admin'})
}

export const isSeller = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isSeller)
    next()
  else
    res.status(401).send({ message: 'Token não é de lojista'})
}

export const isSellerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin))
    next()
  else
    res.status(401).send({ message: 'Token não é de lojista ou admin'})
}