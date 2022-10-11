import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import ProductPage from '~/components/ProductPage';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({params}) => {
    const product = await db.product.findFirst({
        where: {
            id: params.id
        }
    })

    const comments = await db.comment.findMany({
        where: {
            productId: product.id
        }
    })

    return {product: product, comments: comments}
};

function WaterDetail() {
    const data = useLoaderData()
    return (
        <ProductPage product={data.product} comments = {data.comments}/>
    )
}

export default WaterDetail