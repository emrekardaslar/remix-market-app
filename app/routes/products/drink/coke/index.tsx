import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
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

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Market App - Coke",
  viewport: "width=device-width,initial-scale=1",
});

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