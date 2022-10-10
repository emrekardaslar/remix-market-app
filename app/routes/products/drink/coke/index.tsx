import { json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react'
import CategoryPage from '~/components/CategoryPage';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async () => {
  return json(
    await db.product.findMany(
      {
        where: {
          subCategory: 'coke'
        }
      }
    )
  )
};

function Coke() {
  const coke = useLoaderData();
  return (
    <>
      <CategoryPage data={coke}/>
      <Outlet />
    </>
  )
}

export default Coke