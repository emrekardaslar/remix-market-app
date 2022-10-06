import { json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { Row, Col, Button } from 'antd';
import Card from 'antd/lib/card/Card';
import Meta from 'antd/lib/card/Meta';
import PageContent from '~/components/UI/PageContent'
import { useShoppingCart } from '~/context/CartContext';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async () => {
  return json(
    await db.product.findMany()
  )
};

function Coke() {
  const cokes = useLoaderData();
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
        <h1>Coke</h1>
        <Row key={Math.random()} gutter={16}>
          {cokes.map((item: any) => (
            <>
              <div   className="site-card-wrapper">
                <Col span={6}>
                  <Card key={item.id} hoverable size='small' title={item.name} bordered={false}
                    style={{ width: 240 }} cover={<img alt="example" src={item.imgLink} onClick={()=>navigate(`./${item.id}`)} />}>
                    <Meta key={item.id} title={item.name} description={`Price: ${item.price}`} />
                    <br></br>
                    <Button type='primary' onClick={()=>increaseCartQuantity(item.id)}>Add to Cart</Button>
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

export default Coke