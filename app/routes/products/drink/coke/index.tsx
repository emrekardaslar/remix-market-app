import { Link, Outlet } from '@remix-run/react'
import PageContent from '~/components/UI/PageCon'

function Coke() {
  return (
    <>
        <PageContent>
          <h1>Coke</h1>
          <Link to="./1">Coke 1</Link>
          <Link to="./2">Coke 2</Link>
        </PageContent>
      <Outlet/>
    </>
  )
}

export default Coke