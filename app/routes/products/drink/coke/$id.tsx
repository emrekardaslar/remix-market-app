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

    const rating = await db.rating.findMany({
        where: {
            productId: product?.id
        }
    })

    return { product: product, comments: comments, user: user, rating: rating }
};

export const action: ActionFunction = async ({ request, params }): Promise<any> => {
    const formData = await request.formData();
    const response = JSON.parse(formData.get("data"))
    const edit = JSON.parse(formData.get("commentToEdit"))
    const rating = JSON.parse(formData.get("rating"))

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

    else if (request.method === 'POST') {
        //update rating
        if (formData && rating) {
            //check if user has rating
            const doesExists = await db.rating.findFirst({
                where: {
                   AND: [
                    {productId: rating.productId},
                    {userId: rating.userId}
                   ]
                }
            })
            let userRating: any = null;
            if (doesExists) {
                //update
                userRating = await db.rating.update({
                    data: {
                        userId: rating.userId,
                        productId: rating.productId,
                        value: rating.value
                    },
                    where: {
                        id: doesExists.id
                     }
                })
            }
            else {
                //create
                userRating = await db.rating.create({
                    data: {
                        userId: rating.userId,
                        productId: rating.productId,
                        value: rating.value
                    }
                })
            }
            return {rating: userRating}
        }
        //create or update comment
        else if (formData && edit) {
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