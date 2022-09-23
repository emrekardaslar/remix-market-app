import { Outlet } from '@remix-run/react'
import React from 'react'

function Food() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Food