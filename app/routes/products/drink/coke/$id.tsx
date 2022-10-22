import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react'
import moment from 'moment';
import ProductPage from '~/components/ProductPage';
import { getUserId } from '~/services/sesssion.server';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({ request, params }) => {

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
            id: true,
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

    //TODO: find if there is something like select as
    comments.forEach((comment: any) => {
        comment.author = comment.user.username
        comment.avatar = 'https://joeschmoe.io/api/v1/random'
        comment.datetime = moment(comment.createdAt).fromNow()
    })

    return { product: product, comments: comments, user: user }
};

export const action: ActionFunction = async ({ request, params }): Promise<any> => {
    const formData = await request.formData();
    const response = JSON.parse(formData.get("data"))
    const edit = JSON.parse(formData.get("commentToEdit"))
    
    if (request.method == 'DELETE') {
        //delete comment
        const idToDelete = formData.get('commentToDelete')
        const deletedComment = await db.comment.delete({
            where: {
                id: idToDelete
            }
        })
        return { deletedComment }
    }

    else {
        //create or update comment
        if (formData && edit) {
            await db.comment.update({
                data: {
                    content: edit.content
                },
                where: {
                    id: edit.id
                }
            })
        }
        else {
            await db.comment.create({
                data: {
                    content: response.value,
                    productId: params.id,
                    userId: response.user.id
                }
            })
        }
    }

    return {}
};

function CokeDetail() {
    const data = useLoaderData()
    return (
        <ProductPage product={data.product} comments={data.comments} user={data.user} />
    )
}

export default CokeDetail