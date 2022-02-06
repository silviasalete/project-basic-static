export interface Decode {
    exp: number
    id: number
    name: string
    email: string
    roles: Role[]
    iss: string
    sub: string
    iat: number
  }
  
  export interface Role {
    id: number
    name: string
    authority: string
  }
  