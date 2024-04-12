import vine from '@vinejs/vine'

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

export const registerUserValidator = vine.compile(
  vine.object({
    login: vine.string().minLength(3),
    email: vine.string().email(),
    password: vine.string().minLength(6).alphaNumeric(),
    firstName: vine.string().minLength(3),
    lastName: vine.string().minLength(3),
    civility: vine.enum(['male', 'female']),
    phone: vine.string().mobile(),
    address: vine.string().minLength(3),
    city: vine.string(),
    postalCode: vine.string(),
    country: vine.string(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    login: vine.string().minLength(3),
    email: vine.string().email(),
    password: vine.string().minLength(6).alphaNumeric(),
    firstName: vine.string().minLength(3),
    lastName: vine.string().minLength(3),
    civility: vine.enum(['male', 'female']),
    phone: vine.string().mobile(),
    address: vine.string().minLength(3),
    city: vine.string(),
    postalCode: vine.string(),
    country: vine.string(),
  })
)
