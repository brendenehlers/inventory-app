import React, { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import './styles.css'
import Profile from '../Profile/component'
import HLine from '../HLine/component'
import {ProfileData} from '../../schema'

/**
 * This is a navigation sidebar that allows the user to move thru the app
 * Should be displayed on the left side of the screen
 * Should be minimizd if the user is on a small screen with a button to open it
 * Close button in the top corner if the user is on a small screen
 * Starting by building the toggable version, then disabling it when the screen is big enough
 */
type Props = {
  profile: ProfileData
  closableWidth?: number
}

function Sidebar(props: React.PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(true)
  const [closable, setClosable] = useState(false)

  useEffect(() => {
    const windowWidth = window.screen.width
    const minWidth = props.closableWidth != null ? props.closableWidth : 720
    // if the window width is less than the closableWidth, we allow for minimizing the side menu
    if (windowWidth <= minWidth) {
      setIsOpen(false)
      setClosable(true)
    }
  }, [props.closableWidth])

  const handleOpenClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div 
      className={`
        sidebar
        ${isOpen ? 'open' : ''}
      `}
    >
      {isOpen ? 
        <div className='sidebar-open'>
          {closable &&
            <Button variant='outlined' className='close-menu' onClick={handleOpenClose}>
              <CloseIcon />
            </Button>
          }
          <Profile 
            profile={props.profile}
          />
          <HLine thickness={1} />
          <Stack>
            {props.children}
          </Stack>
        </div>
        :
        <div className='sidebar-closed'>
          <Button className='open-menu' size='large'variant='contained' onClick={handleOpenClose}>
            <MenuIcon></MenuIcon>
          </Button>
        </div>
      }
    </div>
  )
}

export default Sidebar