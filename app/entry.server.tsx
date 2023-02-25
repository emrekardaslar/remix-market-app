// entry.server.ts
import type { EntryContext } from '@remix-run/node'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'
import { Head } from './root'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const head = renderHead(request, remixContext)

  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />)

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(
    `<!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet"> 
          <!--start head-->
          ${head}
          <!--end head-->
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
      </html>`,
    {
      status: responseStatusCode,
      headers: responseHeaders,
    },
  )
}

function renderHead(request: Request, remixContext: EntryContext) {
  return renderToString(
    <RemixServer
      context={{
        ...remixContext,
        routeModules: {
          ...remixContext.routeModules,
          root: {
            ...remixContext.routeModules.root,
            default: Head,
          },
        },
      }}
      url={request.url}
    />,
  )
}
