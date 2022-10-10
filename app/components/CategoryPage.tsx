import { useNavigate } from '@remix-run/react'
import { Row, Col, Card, Button } from 'antd'
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
    return (
        <>
            <PageContent>
                <Row key={Math.random()} gutter={16}>
                    {data.map((item: any) => (
                        <>
                            <div className="site-card-wrapper">
                                <Col span={6}>
                                    <Card key={item.id} hoverable size='small' title={item.name} bordered={false}
                                        style={{ width: 240 }} cover={<img alt="example" src={item.imgLink} onClick={() => navigate(`./${item.id}`)} />}>
                                        <Meta key={item.id} title={item.name} description={`Price: ${item.price}`} />
                                        <br></br>
                                        <Button type='primary' onClick={() => increaseCartQuantity(item.id, item.name, item.price)}>Add to Cart</Button>
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