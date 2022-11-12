import { useNavigate } from '@remix-run/react'
import { Row, Col, Card, Button, notification } from 'antd'
import Meta from 'antd/lib/card/Meta'
import PageContent from './UI/PageContent'
import { useShoppingCart } from "~/context/CartContext";

interface CategoryProps {
    data: any
}

function CategoryPage({ data }: CategoryProps) {
    const navigate = useNavigate()
    const {
        increaseCartQuantity,
    } = useShoppingCart()

    const cartAddedNotification = (name: string, price: number) => {
        notification.open({
            message: `${name} added to your cart`,
            description:
                `${name} added to your cart for  $ ${price}`,
            onClick: () => {
                navigate("/cart")
            },
        });
    };

    return (
        <>
            <PageContent>
                <Row key={Math.random()} gutter={16}>
                    {data.map((item: any) => (
                        <>
                            <div className="site-card-wrapper">
                                <Col span={6}>
                                    <Card key={item.id} hoverable  title={item.name} bordered={false}
                                        style={{ width: "15rem" }} 
                                        cover={
                                            <div style={{ overflow: "hidden", height: "15rem"}}>
                                                <img alt="example" style={{ height: "100%" }} src={item.imgLink} onClick={() => navigate(`./${item.id}`)} />
                                            </div>
                                        }>
                                        <Meta key={item.id} title={item.name} description={`Price: ${item.price}`} />
                                        <br></br>
                                        <Button type='primary' onClick={() => { increaseCartQuantity(item.id, item.name, item.price); cartAddedNotification(item.name, item.price); }}>Add to Cart</Button>
                                    </Card>
                                </Col>
                            </div>
                        </>
                    ))}
                </Row>
            </PageContent>
        </>
    )
}

export default CategoryPage