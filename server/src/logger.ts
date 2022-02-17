import { Request } from 'express'
import { RequestWithBody } from './schema'

export function logger<T>(req: Request | RequestWithBody<T>) {
  return console.log(`[info] app${req.originalUrl} called from ${req.headers['user-agent']}`)
}

export function error(message: string) {
  return {
    error: {
      message
    }
  }
}

export default {}