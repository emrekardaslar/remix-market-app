import { useFetcher, useLoaderData } from "@remix-run/react";
import { Row, Card, Button, Col, Rate, notification, Badge } from "antd"
import Meta from "antd/lib/card/Meta"
import { useEffect, useState } from "react";
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
        getItemQuantity
    } = useShoppingCart()
    const [value, setValue] = useState(product.rating);
    const [itemQuantity, setItemQuantity] = useState(0);
    const fetcher = useFetcher();
    const data = useLoaderData();

    const setRating = () => {
        const ratings = data.rating;
        let counter = 0;
        let total = 0;
        ratings.forEach((rating: any) => {
            total += rating.value 
            counter++;
        });
        if (counter == 0) {
            setValue(5)
        }
        else {
            const average = total/counter;
            setValue(average)
        }
    }

    const setItemQty = () => {
        setItemQuantity(getItemQuantity(product.id))
    }

    useEffect(()=>{
        setRating()
        setItemQty()
    }, [])
    
    const updateRating = (val: number) => {
        const rating = {
            value: val,
            userId: user.id,
            productId: product.id
        }

        fetcher.submit(
            {rating: JSON.stringify(rating)},
            {method: 'post'}
        )
        setValue(val)
    }

    const cartAddedNotification = () => {
        notification.open({
            message: 'Item Added',
            description:
                'Item added to your cart',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
        setItemQuantity(itemQuantity+1)
    };

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
                        <Rate allowHalf value={value} onChange={updateRating}/>
                        <h4>Price: ${product.price}</h4>
                        <Meta description={product.description} />
                        <br></br>
                        <Badge count={itemQuantity} status={"success"} showZero>
                            <Button type='primary' onClick={() => {increaseCartQuantity(product.id, product.name, product.price); cartAddedNotification();}}>Add to Cart</Button>
                        </Badge> 
                        <Comments data = {comments} user={user}/>
                    </Col>
                </Row>
            </>
        </PageContent>
    )
}

export default ProductPage