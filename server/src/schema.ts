import { Request, Response } from 'express'

export type RequestWithBody<T> = Request<Record<string, unknown>, Record<string, unknown>, T>
export type ResponseWithBody<T> = Response<T>

export type Add = {
  id: number
  amt?: number
  // product
  name?: string
  price?: number
  // order
  product_id?: number
}


export type Update = {
  [key: string]: unknown
}