import { HttpContext } from '@adonisjs/core/http'
import { JwtService } from '../services/jwt_service.js'
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from '../validators/users_validator.js'
import { inject } from '@adonisjs/core'
import { userMock } from '../mocks/user_mock.js'

export interface User {
  id: string
  login: string
  email: string
  password: string
  firstName: string
  lastName: string
  civility: string
  countryCode: string
  phoneNumber: string
  address: string
  city: string
  postalCode: string
  country: string
}
@inject()
export default class UsersController {
  constructor(private jwtService: JwtService) {}

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)

    const user = data as User
    user.id = crypto.randomUUID()

    const jwt = this.jwtService.generateAccessToken(user)

    return response.header('Authorization', `Bearer ${jwt}`).json(user)
  }

  async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(loginUserValidator)
    const userMocked = userMock[0] as User

    if (data.email !== userMocked.email && data.password !== userMocked.password) {
      return response.unauthorized('Invalid credentials')
    }

    userMocked.id = crypto.randomUUID()
    const user = userMocked

    const jwt = this.jwtService.generateAccessToken(user)

    return response.header('Authorization', `Bearer ${jwt}`).json(user)
  }

  async update({ request, response }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator)

    const user = data as User

    const jwt = this.jwtService.generateAccessToken(user)

    return response.header('Authorization', `Bearer ${jwt}`).json(user)
  }

  async delete({ response }: HttpContext) {
    return response.json({ message: 'User deleted' })
  }
}
