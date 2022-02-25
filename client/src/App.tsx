import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import {Grid, Button} from '@mui/material'

import './App.css'
import Sidebar from './components/Sidebar/component'
import { ProfileData } from './schema'

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

const tempProfile: ProfileData = {
  title: 'Troy Barnes', 
  subtitle: 'Air Conditioning Repair Inc.',
  imageURL: '/troy.jpg',
}

function App() {
  const [currentTab, setCurrentTab] = useState<keyof Data>('products')
  const [data, setData] = useState<Data>({products: [], orders: []})


  const getDataFromDB = async (table: string) => {
    return (await (await fetch(`http://localhost:3001/${table}/50`)).json())
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
    <div className='App'>
      <Grid
        container
        spacing={2}
      >
        {/* This is the navbar column */}
        <Grid item xs={12} sm={3} className='first'>
          <Sidebar profile={tempProfile}>
            <Button>Products</Button>
            <Button>Orders</Button>
          </Sidebar>
        </Grid>
        {/* This is the main content column */}
        <Grid item xs={12} sm={6} className='second'>
          <div style={{height: '100vh'}}></div>
        </Grid>
        {/* This is the additional actions column */}
        <Grid item xs={12} sm={3} className='third'>

        </Grid>
      </Grid>
    </div>
  )
}

export default App;
