import Message from './structs/Message'
import User from './structs/User'

export default class MessageManager {
    private messages: Message[] = []

    addMessage(author: User, content: string): Message | never {
        const newMessage = new Message(author, content)
        this.messages.push(newMessage)
        return newMessage
    }

    removeMessagesByUser(user: User): void {
        this.messages = this.messages.filter((message) => message.getAuthor !== user)
    }

    getMessages(): Message[] {
        return this.messages
    }
}
