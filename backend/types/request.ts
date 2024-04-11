declare module '@adonisjs/core/http' {
  export interface Request {
    jwt?: import('jsonwebtoken').Jwt
  }
}
