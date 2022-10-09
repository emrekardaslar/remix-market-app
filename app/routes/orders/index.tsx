import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Row, Col, Card, Button } from "antd"
import { getUserId } from "~/services/sesssion.server";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request }) => {
    let userId = await getUserId(request);
    if (!userId) throw redirect('/login')
    let orders = (
        await db.order.findMany(
            {
                where: {
                    userId: userId
                }
            }
        )
    )
    return { orders: orders };
};
function Orders() {
    const data = useLoaderData()
    const navigate = useNavigate()
    return (
        <Row key={Math.random()} gutter={16}>
            {data.orders.map((item: any) => (
                <>
                    <div className="site-card-wrapper">
                        <Col span={6}>
                            <Card title={item.id} style={{ width: 300 }} onClick={() => navigate(`./${item.id}`)}>
                                <p>Created at: {item.createdAt}</p>
                                <Button type="danger" onClick={()=>{"TODO: delete order"}}>Delete</Button>
                            </Card>
                        </Col>
                    </div>
                </>
            ))}
        </Row>
    )
}

export default Orders