import { Knex } from 'knex'
import pkg from 'pg'

import { logger } from './logger'
import { Product, Order } from './schema'

const { DatabaseError } = pkg

async function initialize(storage: Knex, loadData=true) {
  logger(`initializing database`)

  try {
    // check for the products table and create it if it doesn't exist
    storage.schema.hasTable('products').then(async (exists) => {
      if (!exists) {
        logger('creating products table')
        await storage.schema.createTable('products', (table) => {
          table.increments('id')
          table.string('name').notNullable()
          table.double('price', 5, 2).checkPositive().notNullable()
          table.integer('amt').checkPositive().notNullable()
        })
        logger('created products table')
        if (loadData) {
          logger('loading sample product data')
          const products: Product[] = [
            {id: 1, name: 'Hammer', price: 9.99, amt: 20},
            {id: 2, name: 'Scissors', price: 4.99, amt: 15},
            {id: 3, name: 'Sheers', price: 10.00, amt: 10},
            {id: 4, name: 'Screwdriver', price: 15.99, amt: 5},
          ]
          await storage('products').insert(products)
        }
      }
    })

    // check for customers table and create it if not there
    storage.schema.hasTable('customers').then(async (exists) => {
      if (!exists) {
        logger('creating customers table')
        await storage.schema.createTable('customers', (table) => {
          table.increments('id')
          table.string('first_name')
          table.string('last_name')
          table.string('email').notNullable()
        })
      }

      if (loadData) {
        logger('loading customer data')
        const customers = [
          {id: 1, first_name: 'Jon', last_name: 'Bon Jovi', email: 'jon@bonjovi.com'},
          {id: 2, first_name: 'Donald', last_name: 'Glover', email: 'don.glove@gmail.com'},
        ]
        await storage('customers').insert(customers)
      }
    })

    // check for the orders table and create it if it doesn't exist
    storage.schema.hasTable('orders').then(async (exists) => {
      if (!exists) {
        logger('creating orders table')
        await storage.schema.createTable('orders', (table) => {
          table.increments('id')
          table.integer('product_id').notNullable()
          table.integer('customer_id').notNullable()
          table.integer('amt').checkPositive().notNullable()
        })
        // change product_id column to have a foreign key constraint
        await storage.schema.table('orders', (table) => {
          table.foreign('product_id').references('products.id')
          table.foreign('customer_id').references('customers.id')
        })
        logger('created orders table')
        if (loadData) { 
          logger('loading sample order data')
          const orders: Order[] = [
            {id: 1, product_id: 1, amt: 3, customer_id: 1},
            {id: 2, product_id: 3, amt: 2, customer_id: 2},
          ]
          await storage('orders').insert(orders)
        }
      }
    })

  } catch (e) {
    if (e instanceof DatabaseError) {
      console.error(e.message)
    }
  }

}

export default initialize