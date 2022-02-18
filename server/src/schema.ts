import { Request, Response } from 'express'

export type TypedRequest<Params, ResponseBody=Record<string, unknown>, RequestBody=Record<string, unknown>> = Request<Params, ResponseBody, RequestBody>
export type ResponseWithBody<ResponseBody> = Response<ResponseBody>

export type Add = Product | Order

export type Update = Partial<Product | Order>

export type Product = {
  id: number
  name: string
  price: number
  amt: number
}

export type Order = {
  id: number
  product_id: number
  amt: number
}