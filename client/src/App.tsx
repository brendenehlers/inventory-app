import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import {Grid, Button} from '@mui/material'

import './App.css'
import Sidebar from './components/Sidebar/component'
import { ProfileData, Column, Product, Order } from './schema'
import Table from './components/Table/component'



type Data = {
  products: Product[]
  orders: Order[]
}

const tempProfile: ProfileData = {
  title: 'Troy Barnes', 
  subtitle: 'Air Conditioning Repair Inc.',
  imageURL: '/troy.jpg',
}

const columns: {[key: string]: Column[]} = {
  products: [
    {name: 'id', display: 'ID', visible: true, minWidth: '10%'},
    {name: 'name', display: 'Name', visible: true, minWidth: '20%'},
    {name: 'price', display: 'Price', visible: true, minWidth: '20%'},
    {name: 'amt', display: 'Quantity', visible: true, minWidth: '20%'},
  ], 
  orders: [
    {name: 'id', display: 'ID', visible: true, minWidth: '10%'},
    {name: 'product_id', display: 'Product ID', visible: true, minWidth: '10%'},
    {name: 'amt', display: 'Quality', visible: true, minWidth: '20%'},
  ]
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

  useEffect(() => {
    setCurrentTab('products')
  }, [])

  return (
    <div className='App'>
      <Grid
        container
        spacing={2}
      >
        {/* This is the navbar column */}
        <Grid item xs={12} sm={3} className='first'>
          <Sidebar profile={tempProfile}>
            <Button onClick={() => setCurrentTab('products')}>Products</Button>
            <Button onClick={() => setCurrentTab('orders')}>Orders</Button>
          </Sidebar>
        </Grid>
        {/* This is the main content column */}
        <Grid item xs={12} sm={6} className='second'>
          <Table 
            columns={columns[currentTab]}
            data={data[currentTab]}
          />
        </Grid>
        {/* This is the additional actions column */}
        <Grid item xs={12} sm={3} className='third'>
          <div style={{height: '100vh'}}></div>
        </Grid>
      </Grid>
    </div>
  )
}

export default App;
