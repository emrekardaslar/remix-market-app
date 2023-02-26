import type { MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react'
import { Footer } from 'antd/lib/layout/layout'
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

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <CartProvider>
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
  const caught = useCatch();

  return (
    <div>
      <h1>404 Error</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <div className="error-container">Sorry, cannot load the page</div>;
}