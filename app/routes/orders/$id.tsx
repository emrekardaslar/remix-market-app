import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { Col, Card } from "antd";
import { getUserId } from "~/services/sesssion.server";
import { db } from "~/utils/db.server";
import Meta from 'antd/lib/card/Meta';

export let loader: LoaderFunction = async ({ params, request }) => {
    let userId = await getUserId(request);
    if (!userId) throw redirect('/login')

    let orderItems: any = (
        await db.orderItem.findFirst(
            {
                where: {
                    orderId: params.id
                }
            }
        )
    )

    let products = (
        await db.product.findMany(
            {
                where: {
                    id: orderItems.productId
                }
            }
        )
    )

    return { orderItems: orderItems, products: products };
};

function OrderDetails() {
    const params = useParams();
    const data = useLoaderData();
    console.log(data)
    return (
        <div>
            <h4>Order: {params.id}</h4>
            {data.products.map((item: any) => (
            <>
                <Col span={6}>
                  <Card key={item.id} hoverable size='small'
                    style={{ width: 120 }}>
                    <Meta key={item.id} title={item.name} description={`Price: ${item.price}`} />
                  </Card>
                </Col>
            </>
          ))} 
        </div>
    )
}

export default OrderDetails