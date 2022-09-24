import { Outlet } from "@remix-run/react"
import HeaderC from "~/components/Header"
import headerItems from "../mock/headerItems"

function Login() {
  return (
    <>
        <HeaderC items={headerItems} selectedKey='Login' />
        <Outlet />
    </>
  )
}

export default Login