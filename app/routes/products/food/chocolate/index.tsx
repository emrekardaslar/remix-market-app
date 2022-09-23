import { Link, Outlet } from '@remix-run/react'
import PageContent from '~/components/UI/PageContent'

function Chocolate() {
  return (
    <>
    <PageContent>
        <Link to="./1">Chocolate 1</Link>
        <Link to="./2">Chocolate 2</Link>
    </PageContent>
    <Outlet/>
    </>
  )
}

export default Chocolate