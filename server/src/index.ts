import express, {Request, Response} from 'express'
import 'dotenv/config'
import knex from 'knex'
import _ from 'lodash'
import bodyParser from 'body-parser'

import { RequestWithBody } from './schema'
import {logger} from './logger'

const app = express()
app.use(bodyParser.json())
const port = 3001

const storage = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
})

app.get('/products/id/:id', async (req, res) => {
  const [query] = await storage('products').where({id: req.params.id}).select('*')
  if (!_.isEmpty(query)) {
    res.status(200).send(query)
  } else {
    res.status(404).send({error: {message: `Product with id ${req.params.id} not found`}})
  }
})

type AddProduct = {
  id: number
  name: string
  price: number
  amt_available: number
}

app.post('/addProduct', async (req: RequestWithBody<AddProduct>, res) => {
  logger(req)
  const body = req.body
  const productWithId = await storage('products').where({id: body.id}).select('*')
  console.log(productWithId)
  if (!productWithId.length) {
    await storage('products').insert({...body})
    res.status(200).send(body)
  } else {
    res.status(409).send({error: {message: `Product with id ${body.id} already exists`}})
  }
})

type UpdateProduct = {
  [key: string]: any
}

app.put('/updateProduct/id/:id', async (req: RequestWithBody<UpdateProduct>, res) => {
  logger(req)
  const id = req.params.id
  const body = req.body
  const count = await storage('products').where({id}).update(body)
  if (count === 1) {
    res.status(200).send()
  } else {
    res.status(404).send({error: {message: `Product with id ${id} not found`}})
  }
})

app.get('/orders/id/:id', async (req, res) => {
  const [query] = await storage('orders').where({id: req.params.id}).select('*')
  if (!_.isEmpty(query)) {
    res.status(200).send(query)
  } else {
    res.status(400).send({error: {message: `Order with id ${req.params.id} not found`}})
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})