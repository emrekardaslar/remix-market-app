import { Outlet } from '@remix-run/react'

function index() {
  return (
    <>
        <h1>Drinks</h1>
        <Outlet/>
    </>
  )
}

export default index