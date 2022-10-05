import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { Col, Card } from "antd";
import { getUserId } from "~/services/sesssion.server";
import { db } from "~/utils/db.server";
import Meta from 'antd/lib/card/Meta';
import { getTotalPrice } from "~/utils/helper";

export let loader: LoaderFunction = async ({ params, request }) => {
    let userId = await getUserId(request);
    if (!userId) throw redirect('/login')

    let orderItems: any = (
        await db.orderItem.findMany(
            {
                where: {
                    orderId: params.id
                }
            }
        )
    )
    const items = orderItems.map((item: any) => item.productId)

    let products = (
        await db.product.findMany(
            {
                where: {
                    id: {in: items}
                }
            }
        )
    )

    return { orderItems: orderItems, products: products };
};

function OrderDetails() {
    const params = useParams();
    const data = useLoaderData();

    return (
        <div style={{margin: "30px"}}>
            <h4>Order: {params.id}</h4>
            {data.products.map((item: any) => (
            <>
                <Col span={6}>
                  <Card key={item.id} hoverable size='small'
                    style={{ width: 120 }}>
                    <Meta key={item.id} title={item.name} description={`Price: $${item.price}`} />
                  </Card>
                </Col>
            </>
          ))} 

          <h4>Total Price: ${getTotalPrice(data.products)}</h4>
        </div>
    )
}

export default OrderDetails