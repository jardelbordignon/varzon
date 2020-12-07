declare namespace Express {

  // adiciona user ao Request do express
  export interface Request {
    user: {
      id: number
      name?: string
      email?: string
      isAdmin?: boolean
    }
  }
}
