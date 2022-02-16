import { Request } from 'express'
import { RequestWithBody } from './schema'

export function logger<T>(req: Request | RequestWithBody<T>) {
  return console.log(`[info] ${req.route.path} called from ${req.headers['user-agent']}`)
}

export default {}