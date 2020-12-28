declare namespace Express {

  // adiciona user ao Request do express
  export interface Request {
    user: {
      id: number
      name: string
      isAdmin: boolean
      isSeller: boolean
    }
  }
}
