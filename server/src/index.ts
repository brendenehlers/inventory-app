import express from 'express'
import 'dotenv/config'
import knex from 'knex'
import _ from 'lodash'
import bodyParser from 'body-parser'
import pkg from 'pg'
const { DatabaseError } = pkg

import { Add, Update } from './schema'
import { logger, error } from './logger'

const app = express()
app.use(bodyParser.json())
const port = 3001

const storage = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
})

app.use((req, res, next) => {
  logger(req)
  next()
})

app.get('/:name', async (req, res) => {
  const name = req.params.name
  try {
    const data = await storage(name).select('*')
    if (data.length) {
      res.send(data)
    } else {
      res.status(404).send(error(`Table '${name}' did not contain any values`))
    }
  } catch (e) {
    if (e instanceof DatabaseError) {
      res.status(404).send(error(`Table '${name}' not found`))
    }
  }
})

app.get('/:name/:id', async (req, res) => {
  const {name, id} = req.params
  try {
    const data = await storage(name).where({id}).select('*')
    if (data.length) {
      res.send(data[0])
    } else {
      res.status(404).send(error(`Table '${name}' did not contain value with id '${id}'`))
    }
  } catch (e) {
    if (e instanceof DatabaseError) {
      res.status(404).send(error(`Table '${name}' not found`))
    }
  }
})

app.post('/:name/add', async (req, res) => {
  const { name } = req.params
  const body: Add = req.body
  try {
    const existingEntry = await storage(name).where({id: body.id}).select('id')
    if (!existingEntry.length) {
      await storage(name).insert(body)
      res.status(200).send(body)
    } else {
      res.status(409).send(error(`Item with id '${body.id}' in Table '${name}' already exists`))
    } 
  } catch (e) {
    if (e instanceof DatabaseError) {
      console.error(e)
      res.status(404).send(error(e.message))
    }
  }
})

app.put('/:name/update/:id', async (req, res) => {
  const { name, id } = req.params
  const body: Update = req.body
  try {
    const count = await storage(name).where({id}).update(body)
    if (count === 1) {
      res.status(200).send('successful')
    } else {
      res.status(404).send(error(`Product with id ${id} not found`))
    }
  } catch (e) {
    if (e instanceof DatabaseError) {
      res.status(500).send(error(e.message))
    }
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})