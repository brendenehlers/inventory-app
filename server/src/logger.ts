import { Request } from 'express'
import { TypedRequest } from './schema'

export function logger<P, ResB, ReqB>(req: Request | TypedRequest<P, ResB, ReqB>) {
  return console.log(`[info] app${req.originalUrl} called from ${req.headers['user-agent']}`)
}

export function error(message: string) {
  return {
    error: {
      message
    }
  }
}

export function success(message: string) {
  return {
    success: {
      message
    }
  }
}

export default {}