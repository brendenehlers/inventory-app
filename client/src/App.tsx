import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import './App.css'

type Product = {
  id: number
  name: string
  price: number
  amt: number
}

type Order = {
  id: number
  product_id: number
  amt: number
}

type Data = {
  products: Product[]
  orders: Order[]
}

function App() {
  const [currentTab, setCurrentTab] = useState<keyof Data>('products')
  const [data, setData] = useState<Data>({products: [], orders: []})


  const getDataFromDB = async (table: string) => {
    return (await (await fetch(`http://localhost:3001/${table}`)).json())
  }

  useEffect(() => {
    getDataFromDB(currentTab)
    .then(ret => {
      setData(d => {
        return {
          ...d,
          [currentTab]: ret
        }
      })
    })
  }, [currentTab])

  return (
    <div className="App">
      <div className='navbar'>
        <button onClick={() => setCurrentTab('products')}>Products</button>
        <button onClick={() => setCurrentTab('orders')}>Orders</button>
      </div>
      <div className='content'>
        {data[currentTab].length ? 
          _.map(data[currentTab] as Array<any>, (entry: Product | Order) => {
            if (currentTab === 'products') {
              const product: Product = entry as Product
              return (
                <div id={`${product.id}`}>
                  {product.name} ({product.amt}): {product.price}
                </div>
              )
            }
            if (currentTab === 'orders') {
              const order: Order = entry as Order
              return (
                <div id={`${order.id}`}>
                  Product ID: {order.product_id}, Amount: {order.amt}
                </div>
              )
            }
          })
        : `Getting ${currentTab} data`}
      </div>
    </div>
  )
}

export default App;
