import { Row, Card, Button } from "antd"
import Meta from "antd/lib/card/Meta"
import { useShoppingCart } from "~/context/CartContext"
import PageContent from "./UI/PageContent"

interface ProductPageProps {
    product: any
}

function ProductPage({ product }: ProductPageProps) {
    const {
        increaseCartQuantity,
    } = useShoppingCart()

    return (
        <PageContent>
            <Row gutter={60}>
                <Card style={{ maxWidth: 800 }} cover={<img alt={product.name} src={product.imgLink}/>}>
                    <Meta title={product.name} description={product.description} />
                    <br></br>
                    <Button type='primary'
                        onClick={() => increaseCartQuantity(product.id, product.name, product.price)}>Add to Cart</Button>
                </Card>
            </Row>
        </PageContent>
    )
}

export default ProductPage