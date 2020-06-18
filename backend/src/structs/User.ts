import { internet } from 'faker'
import Joi from 'joi'

export const schema = Joi.object({
    username: Joi.string()
        .min(2)
        .max(24)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.type) {
                    case 'any.empty':
                        err.message = 'Username should not be empty!'
                        break
                    case 'string.min':
                        err.message = 'Username should have at least 2 characters!'
                        break
                    case 'string.max':
                        err.message = 'Username should have at most 24 characters!'
                        break
                    default:
                        break
                }
            })
            return errors
        }),
    socketID: Joi.string().required(),
    color: Joi.string(),
})

export default class User {
    private color: string

    constructor(private username: string, private socketID: string) {
        this.color = internet.color()
        const validation = schema.validate({
            username,
            socketID,
        })

        if (validation.error) {
            throw new Error(validation.error.details[0].message)
        }
    }

    get getSocketID(): string {
        return this.socketID
    }

    get getUsername(): string {
        return this.username
    }
}
