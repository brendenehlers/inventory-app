import { Request, Response } from 'express'

export type RequestWithBody<T> = Request<Record<string, unknown>, Record<string, unknown>, T>
export type ResponseWithBody<T> = Response<T>
