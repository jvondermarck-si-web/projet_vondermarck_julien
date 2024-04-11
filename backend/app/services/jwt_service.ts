import env from '#start/env'
import { inject } from '@adonisjs/core'
import jwt, { Jwt } from 'jsonwebtoken'

const JWT_ACCESS_EXPIRES_IN = '365d'

@inject()
export class JwtService {
  generateAccessToken<T extends object>(data: T): string {
    return jwt.sign(data, env.get('APP_KEY'), { expiresIn: JWT_ACCESS_EXPIRES_IN })
  }

  verifyJwt(token: string): Jwt {
    const bearer = token.split(' ')[1]
    const payload = jwt.verify(bearer, env.get('APP_KEY'), {
      complete: true,
      algorithms: ['HS256'],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    })

    return payload
  }
}
