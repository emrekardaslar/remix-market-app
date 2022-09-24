import { Outlet } from "@remix-run/react"
import HeaderC from "~/components/Header"
import headerItems from "../mock/headerItems"

function FavoriteList() {
    return (
        <>
            <HeaderC items={headerItems} selectedKey='Favorite List' />
            <Outlet />
        </>
    )
}

export default FavoriteList