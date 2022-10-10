import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react"
import CategoryPage from "~/components/CategoryPage";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  return json(
    await db.product.findMany(
      {
        where: {
          subCategory: 'water'
        }
      }
    )
  )
};

function Water() {
  const water = useLoaderData();
  return (
    <>
      <CategoryPage data={water}/>
      <Outlet />
    </>
  )
}

export default Water