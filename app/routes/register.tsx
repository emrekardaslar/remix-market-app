import { Outlet } from '@remix-run/react'
import HeaderC from '~/components/Header'
import headerItems from "../mock/headerItems"

function Register() {
    return (
        <>
            <HeaderC items={headerItems} selectedKey='Register' />
            <Outlet />
        </>
    )
}

export default Register