import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react'
import CategoryPage from '~/components/CategoryPage';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async () => {
  return json(
    await db.product.findMany(
      {
        where: {
          subCategory: 'chocolate'
        }
      }
    )
  )
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Market App - Chocolate",
  viewport: "width=device-width,initial-scale=1",
});

function Chocolate() {
  const chocolate = useLoaderData();
  return (
    <>
      <CategoryPage data={chocolate}/>
      <Outlet/>
    </>
  )
}

export default Chocolate