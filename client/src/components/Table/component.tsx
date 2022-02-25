import React from 'react'
import _ from 'lodash'

import { Column, Product, Order } from '../../schema'
import Row from './Row/component'

type Props = {
  columns: Column[]
  data: Product[] | Order[]
}

function Table(props: Props) {

  const handleSelectAll = () => {
    // TODO finish the logic of the table
  }

  return (
    <div className='table'>
      <div>
        <Row header columns={props.columns} />
        {props.data ? _.map<Product | Order>(props.data, (datum: Product | Order) => {
          return <Row data={datum} columns={props.columns} />
        }) :<p>Waiting for data</p>}

      </div>
    </div>  
  )
}

export default Table