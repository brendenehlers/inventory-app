import React from 'react'
import { Button } from '@mui/material'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'

import './styles.css'
import { ProfileData } from '../../schema'

type Props = {
  profile: ProfileData
}

function Profile(props: Props) {
  return (
    <div className='profile'>
      {props.profile.imageURL ? 
        <img className='picture' src={props.profile.imageURL} alt='' />
      :
      <div className='picture no-img'>
        Your face here
      </div>
      }
      <div className='info'>
        <div className='title'> 
          {props.profile.title}
        </div>
        <div className='subtitle'>
          {props.profile.subtitle}
        </div>
      </div>
      <Button variant='outlined' className='manage' onClick={() => alert('working on it')}>
        <ManageAccountsOutlinedIcon></ManageAccountsOutlinedIcon>
      </Button>
    </div>
  )
}

export default Profile