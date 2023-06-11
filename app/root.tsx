import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react'
import { Footer } from 'antd/lib/layout/layout'
import { CartProvider } from './context/CartContext'
import styles from './styles/global.css'
import Header from './components/Header'
import { getHeaderItems } from '~/utils/helper'
import headerItems from './mock/headerItems'
import { getUserId } from './services/sesssion.server'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Market App',
  viewport: 'width=device-width,initial-scale=1',
})

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request)
  return { user: userId }
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/antd@4.21.6/dist/antd.css',
    },
    {
      rel: 'stylesheet',
      href: styles,
    },
  ]
}

export default function App() {
  const data = useLoaderData()
  let items = getHeaderItems(data, headerItems)
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <CartProvider>
          <Header items={items} />
          <Outlet />
          <Footer
            style={{ textAlign: 'center', position: 'relative', bottom: '0px', width: '100%' }}
          >
            Market App ©2022 Created by emrekardaslar
          </Footer>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </CartProvider>
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>404 Error</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}

/* export function ErrorBoundary({ error }: { error: Error }) {
  return <div className='error-container'>Sorry, cannot load the subcategory</div>
}
 */
