import { Server } from 'http'
import io from 'socket.io'
import { messageManager, userManager } from './app'

let socketServer: io.Server

function sendNotification(
    socket: io.Socket,
    notification: {
        type: 'error' | 'warning' | 'success'
        title: string
        message: string
    },
): void {
    socket.emit('notification', notification)
}

export function createSocket(server: Server): void {
    socketServer = io(server)

    socketServer.on('connection', (socket) => {
        socket.emit('pre initialize', {
            username: userManager.suggestUsername(),
            messages: messageManager.getMessages(),
        })

        socket.on('initialize', ({ username }) => {
            try {
                userManager.addUser(socket.id, username)
                socket.emit('finished initialize')
            } catch (error) {
                sendNotification(socket, {
                    type: 'error',
                    title: 'Could not create user',
                    message: error.message,
                })
            }
        })

        socket.on('send message', ({ content }) => {
            const author = userManager.findUserBySocketID(socket.id)
            if (!author) {
                sendNotification(socket, {
                    type: 'error',
                    title: 'Error sending message',
                    message: 'Could not send message because i could not identify you',
                })
            } else {
                try {
                    const message = messageManager.addMessage(author, content.trim())
                    socket.emit('new message', { message })
                    socket.broadcast.emit('new message', { message })
                } catch (error) {
                    sendNotification(socket, {
                        type: 'error',
                        title: 'Error sending message',
                        message: error.message,
                    })
                }
            }
        })

        socket.on('disconnect', () => {
            const user = userManager.findUserBySocketID(socket.id)
            if (!user) {
                return
            }

            userManager.removeUser(user)
            messageManager.removeMessagesByUser(user)

            socket.broadcast.emit('forget user', {
                username: user.getUsername,
            })
        })
    })
}
