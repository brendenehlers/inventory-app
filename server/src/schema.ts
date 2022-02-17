import { Request, Response } from 'express'

export type TypedRequest<Params, ResponseBody=Record<string, unknown>, RequestBody=Record<string, unknown>> = Request<Params, ResponseBody, RequestBody>
export type ResponseWithBody<ResponseBody> = Response<ResponseBody>

export type Add = {
  id: number
  amt: number
  // product
  name?: string
  price?: number
  // order
  product_id?: number
}


export type Update = {
  // product
  name?: string
  price?: number
  amt_available?: number
  // order
  product_id?: number
  amt?: number
}