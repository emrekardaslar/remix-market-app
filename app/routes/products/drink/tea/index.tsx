import { LoaderFunction, json, MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react"
import { db } from "~/utils/db.server";
import CategoryPage from "~/components/CategoryPage";

export const loader: LoaderFunction = async () => {
  return json(
    await db.product.findMany(
      {
        where: {
          subCategory: 'tea'
        }
      }
    )
  )
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Market App - Tea",
  viewport: "width=device-width,initial-scale=1",
});

function Tea() {
  const tea = useLoaderData();
  return (
    <>
      <CategoryPage data={tea}/>
      <Outlet />
    </>
  )
}

export default Tea