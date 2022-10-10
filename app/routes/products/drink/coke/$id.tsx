import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react'
import ProductPage from '~/components/ProductPage';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({params}) => {
    return json(
        await db.product.findFirst({
            where: {
                id: params.id
            }
        })
    )
};

function CokeDetail() {
    const coke = useLoaderData()
    return (
        <ProductPage product={coke}/>
    )
}

export default CokeDetail