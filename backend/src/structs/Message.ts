import Joi from 'joi'
import User, { schema as userSchema } from './User'

export const schema = Joi.object({
    author: userSchema,
    content: Joi.string()
        .alphanum()
        .min(1)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.type) {
                    case 'any.empty':
                        err.message = 'Message should not be empty!'
                        break
                    case 'string.min':
                        err.message = 'Message should have at least 1 characters!'
                        break
                    default:
                        break
                }
            })
            return errors
        }),
})

export default class Message {
    constructor(private author: User, private content: string) {
        const validation = schema.validate({
            author,
            content,
        })

        if (validation.error) {
            throw new Error(validation.error.details[0].message)
        }
    }

    get getAuthor(): User {
        return this.author
    }
}
