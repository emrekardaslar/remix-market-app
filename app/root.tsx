import type { MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { Footer } from 'antd/lib/layout/layout'
import { createPortal } from 'react-dom'
import { ClientOnly } from 'remix-utils'
import { CartProvider } from './context/CartContext'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Market App',
  viewport: 'width=device-width,initial-scale=1',
})

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/antd@4.21.6/dist/antd.css',
    },
  ]
}

export function Head() {
  return (
    <>
      <Meta />
      <Links />
    </>
  )
}

export default function App() {
  return (
    <>
      <ClientOnly>{() => createPortal(<Head />, document.head)}</ClientOnly>
      <CartProvider>
        <Outlet />
        <Footer style={{ textAlign: 'center', position: 'relative', bottom: '0px', width: '100%' }}>
          Market App ©2022 Created by emrekardaslar
        </Footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </CartProvider>
    </>
  )
}
