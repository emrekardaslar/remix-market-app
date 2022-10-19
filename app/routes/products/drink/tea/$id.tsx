import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { request } from 'http';
import moment from 'moment';
import ProductPage from '~/components/ProductPage';
import { getUserId } from '~/services/sesssion.server';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ( {params, request} ) => {
    const product = await db.product.findFirst({
        where: {
            id: params.id
        }
    })

    let comments = await db.comment.findMany({
        where: {
            productId: product.id
        },
        select: {
            productId: true,
            content: true,
            createdAt: true,
            user: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    let userId = await getUserId(request);
    let user = null;
    if (userId) {
        user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true
            }
        })
    }
    comments.forEach((comment:any) => {
        comment.author = comment.user.username
        comment.avatar= 'https://joeschmoe.io/api/v1/random'
        comment.datetime = moment(comment.createdAt).fromNow()
    })
    //TODO: remove code duplication
    return {product: product, comments: comments, user: user}
}

export const action: ActionFunction = async ({ request, params }): Promise<any> => {
    const formData = await request.formData();
    const response = JSON.parse(formData.get("data"))
    await db.comment.create({
        data: {
            content: response.value,
            productId: params.id,
            userId: response.user.id
        }
    })

    return {}
};

function TeaDetail() {
    const data = useLoaderData()
    return (
        <ProductPage product={data.product} comments = {data.comments} user={data.user}/>
    )
}

export default TeaDetail