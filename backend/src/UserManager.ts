import { internet } from 'faker'
import User from './structs/User'

export default class UserManager {
    private users: User[] = []

    findUserByName(name: string): User | undefined {
        return this.users.find((user) => user.getUsername === name)
    }

    findUserBySocketID(socketID: string): User | undefined {
        return this.users.find((user) => user.getSocketID === socketID)
    }

    addUser(socketID: string, username: string): void | never {
        const duplicateUsername = this.findUserByName(username)

        if (duplicateUsername) {
            throw new Error('Username is already in use!')
        }

        const newUser = new User(username, socketID)
        this.users.push(newUser)
    }

    removeUser(user: User): void {
        this.users = this.users.filter((_user) => _user !== user)
    }

    suggestUsername(): string {
        return internet.userName()
    }
}
