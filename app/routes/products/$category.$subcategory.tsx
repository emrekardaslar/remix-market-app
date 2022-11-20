import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import CategoryPage from '~/components/CategoryPage'
import { db } from '~/utils/db.server'


export const loader: LoaderFunction = async ({ request, params }) => {
    return json(
        await db.product.findMany(
            {
                where: {
                    subCategory: params.subcategory
                }
            }
        )
    )
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Category",
    viewport: "width=device-width,initial-scale=1",
  });

function Subcategory() {
    const data = useLoaderData();
    return (
        <>
            <CategoryPage data={data} />
            <Outlet />
        </>
    )
}

export default Subcategory
