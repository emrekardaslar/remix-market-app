import { Row, Card, Button, Col, Rate } from "antd"
import Meta from "antd/lib/card/Meta"
import { useShoppingCart } from "~/context/CartContext"
import Comments from "./Comments";
import PageContent from "./UI/PageContent"

interface ProductPageProps {
    product: any,
    comments: any,
    user: any
}

function ProductPage({ product, comments, user }: ProductPageProps) {
    const {
        increaseCartQuantity,
    } = useShoppingCart()

    return (
        <PageContent>
            <>
                <Row>
                    <Col span={12}>
                        <Card style={{ maxWidth: 800 }} cover={<img alt={product.name} src={product.imgLink} />}>
                            <Meta title={product.name} description={product.description} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <h2>{product.name}</h2>
                        <Rate allowHalf defaultValue={4.5} />
                        <h4>Price: ${product.price}</h4>
                        <Meta description={product.description} />
                        <br></br>
                        <Button type='primary' onClick={() => increaseCartQuantity(product.id, product.name, product.price)}>Add to Cart</Button>
                        <Comments data = {comments} user={user}/>
                    </Col>
                </Row>
            </>
        </PageContent>
    )
}

export default ProductPage