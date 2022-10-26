import { LoaderFunction, json, MetaFunction } from "@remix-run/node";
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

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Market App - Water",
  viewport: "width=device-width,initial-scale=1",
});

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