import { HttpContext } from '@adonisjs/core/http'
import { JwtService } from '../services/jwt_service.js'
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from '../validators/users_validator.js'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(private jwtService: JwtService) {}

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)

    console.log(data)

    return response.json({ message: 'User registered' })
  }

  async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(loginUserValidator)
    console.log(data)

    if (data.email !== 'livalie@italy.it' || data.password !== 'livalie') {
      return response.unauthorized('Invalid credentials')
    }

    const user = { id: crypto.randomUUID(), email: data.email, firstName: 'Livia' }

    const jwt = this.jwtService.generateAccessToken(user)

    return response.header('Authorization', `Bearer ${jwt}`).json(user)
  }

  async update({ request, response }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator)

    const user = { id: crypto.randomUUID(), email: data.email }

    const jwt = this.jwtService.generateAccessToken(user)

    return response.header('Authorization', jwt).json(user)
  }

  async delete({ response }: HttpContext) {
    return response.json({ message: 'User deleted' })
  }
}
