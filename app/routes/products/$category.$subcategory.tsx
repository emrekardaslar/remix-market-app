import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import CategoryPage from '~/components/CategoryPage'
import { db } from '~/utils/db.server'
import { capitalizeFirstLetter } from '~/utils/helper'


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

export const meta: MetaFunction<typeof loader> = ({
    params,
  }) => {
    const { subcategory } = params;
    return {
      title:capitalizeFirstLetter(`${subcategory}`),
      description: subcategory,
    };
  };

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
