import { HttpContext } from '@adonisjs/core/http'
import { JwtService } from '../services/jwt_service.js'
import {
  deleteUserValidator,
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from '../validators/users_validator.js'
import { inject } from '@adonisjs/core'
import User from '../models/user.js'

@inject()
export default class UsersController {
  constructor(private jwtService: JwtService) {}

  async register({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(registerUserValidator)

      const user = new User()
      user.firstName = data.firstName
      user.lastName = data.lastName
      user.email = data.email
      user.password = data.password
      user.login = data.login
      user.civility = data.civility
      user.countryCode = data.countryCode
      user.phoneNumber = data.phoneNumber
      user.address = data.address
      user.city = data.city
      user.postalCode = data.postalCode
      user.country = data.country

      // Save user to database
      await user.save()

      const jwt = this.jwtService.generateAccessToken(user)

      return response.header('Authorization', `Bearer ${jwt}`).json(user)
    } catch (e) {
      console.log(e)
      return response.badRequest('An error occurred while creating the user')
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(loginUserValidator)

      const user = await User.query().where('email', data.email).firstOrFail()

      if (data.password !== user.password) {
        return response.unauthorized('Invalid credentials')
      }

      const jwt = this.jwtService.generateAccessToken({ id: user.id, email: user.email })

      return response.header('Authorization', `Bearer ${jwt}`).json(user)
    } catch (e) {
      console.log(e)
      return response.badRequest('An error occurred while logging in')
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(updateUserValidator)

      const user = await User.findOrFail(data.id) // Assuming you have the user ID in the request data

      user.firstName = data.firstName
      user.lastName = data.lastName
      user.email = data.email
      user.password = data.password
      user.login = data.login
      user.civility = data.civility
      user.countryCode = data.countryCode
      user.phoneNumber = data.phoneNumber
      user.address = data.address
      user.city = data.city
      user.postalCode = data.postalCode
      user.country = data.country

      await user.save()

      const jwt = this.jwtService.generateAccessToken({ id: user.id, email: user.email })

      return response.header('Authorization', `Bearer ${jwt}`).json(user)
    } catch (e) {
      console.log(e)
      return response.badRequest('An error occurred while updating the user')
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(deleteUserValidator)

      await User.query().where('id', data.id).delete()

      return response.json({ message: 'User deleted successfully' })
    } catch (e) {
      console.log(e)
      return response.badRequest('An error occurred while deleting the user')
    }
  }
}
