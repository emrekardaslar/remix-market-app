import { LoaderFunction, json } from "@remix-run/node";
import { Link, Meta, Outlet, useLoaderData, useNavigate } from "@remix-run/react"
import { Row, Col, Card, Button } from "antd";
import PageContent from "~/components/UI/PageContent"
import { useShoppingCart } from "~/context/CartContext";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  return json(
    await db.product.findMany(
      {
        where: {
          subCategory: 'tea'
        }
      }
    )
  )
};

function Tea() {
  const teas = useLoaderData();
  const navigate = useNavigate()
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  return (
    <>
      <PageContent  >
        <h1>Tea</h1>
        <Row key={Math.random()} gutter={16}>
          {teas.map((item: any) => (
            <>
              <div   className="site-card-wrapper">
                <Col span={6}>
                  <Card key={item.id} hoverable size='small' title={item.name} bordered={false}
                    style={{ width: 240 }} cover={<img alt="example" src={item.imgLink} onClick={()=>navigate(`./${item.id}`)} />}>
                    <Meta key={item.id} title={item.name} description={`Price: ${item.price}`} />
                    <br></br>
                    <Button type='primary' onClick={()=>increaseCartQuantity(item.id, item.name)}>Add to Cart</Button>
                  </Card>
                </Col>
              </div>
            </>
          ))} 
        </Row>
      </PageContent>
      <Outlet />
    </>
  )
}

export default Tea