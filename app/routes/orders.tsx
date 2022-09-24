import { Outlet } from '@remix-run/react'
import HeaderC from '~/components/Header'
import headerItems from "../mock/headerItems"

function Orders() {
  return (
    <>
        <HeaderC items={headerItems} selectedKey='Orders' />
        <Outlet />
    </>
  )
}

export default Orders