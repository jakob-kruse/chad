import compression from 'compression'
import express from 'express'
import { promises as fs } from 'fs'
import { createServer } from 'http'
import { join } from 'path'
import serveStatic from 'serve-static'
import MessageManager from './MessageManager'
import { createSocket } from './socket'
import UserManager from './UserManager'

export const userManager = new UserManager()
export const messageManager = new MessageManager()

const { PORT = 3000, PUBLIC_DIR = '../frontend/public/' } = process.env

const app = express()
const server = createServer(app)

async function getFrontendBuild() {
    const publicDir = await fs.stat(PUBLIC_DIR)
    if (!publicDir.isDirectory()) {
        throw Error('No public directory found. Please specify it via the PUBLIC_DIR enviroment variable')
    }

    const buildDir = await fs.stat(join(PUBLIC_DIR, 'build'))
    if (!buildDir.isDirectory()) {
        throw Error(
            'No build directory found. Please specify it via the PUBLIC_DIR enviroment variable. It should contain the svelte build',
        )
    }

    return serveStatic(PUBLIC_DIR)
}

async function main() {
    app.use(await getFrontendBuild(), compression({ threshold: 0 }))
    createSocket(server)
    server.listen(PORT, () => {
        console.log(`> Server listening on port ${PORT} - http://localhost:${PORT}`)
    })
}

main()
