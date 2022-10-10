import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
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

function WaterDetail() {
    const water = useLoaderData()
    return (
        <ProductPage product={water}/>
    )
}

export default WaterDetail