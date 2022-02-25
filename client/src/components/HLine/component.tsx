import React from 'react'

type Props = {
  thickness: number
}

function HLine(props: Props) {
  return (
    <div 
      className='line'
      style={{
        width: '90%',
        borderRadius: '100%',
        margin: '10px 0 10px 5%',
        border: `${props.thickness}px solid rgba(0, 0, 0, 0.6)`
      }}
    >

    </div>
  )
}

export default HLine