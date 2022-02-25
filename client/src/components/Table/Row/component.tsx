import React, {useState} from 'react'
import { Grid, Checkbox } from '@mui/material'
import _ from 'lodash'

import './styles.css'
import { Product, Order, Column, Fuzzy } from '../../../schema'


type Props = {
  columns: Column[]
  data?: Fuzzy<Product | Order>
  header?: boolean
}

function Row(props: Props) {
  return (
    <div className={`row ${props.header?'header':''}` }>
      <div className='checkbox'>
        <Checkbox></Checkbox>
      </div>
      {props.header ? 
        _.map(props.columns, (col, i) => {
          if (col.visible) {
            return (
              <div
                className='cell header'
                key={`${col.name}-${i}`}
                style={{
                  minWidth: col.minWidth,
                }}
              >
                <p>{col.display}</p>
              </div>
            )
          }
        })
      :
        _.map(props.columns, (col, i) => {
          if (col.visible) {
            return (
              <div 
                className='cell'
                key={`${props.data?.id}-${i}`}
                style={{
                  minWidth: col.minWidth,
                  // textAlign: col.align,
                }}
              >
                <p>{props.data?.[col.name]}</p>
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default Row