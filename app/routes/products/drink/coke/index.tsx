import { LoaderFunction } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import PageContent from '~/components/UI/PageContent'

export const loader: LoaderFunction = async () => {
  const data = {
      items: [
          { id: "1", name: "Coca-cola" },
          { id: "2", name: "Pepsi" },
      ]
  }
  return data;
};

function Coke() {
  const {items} = useLoaderData();
  return (
    <>
        <PageContent>
          <h1>Coke</h1>
          {items.map((item: any) => (
            <>
              <Link to={item.id}>{item.name} </Link>
            </>
          ))}
        </PageContent>
      <Outlet/>
    </>
  )
}

export default Coke