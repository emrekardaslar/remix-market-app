import { LoaderFunction } from '@remix-run/node';
import { Link, Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { Row, Col, Divider } from 'antd';
import Card from 'antd/lib/card/Card';
import Meta from 'antd/lib/card/Meta';
import PageContent from '~/components/UI/PageContent'

export const loader: LoaderFunction = async () => {
  const data = {
    items: [
      { id: "1", name: "Coca-cola", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgT-aVvy9-AaxbhqALWPPBtzkmsi-1_z5Zw&usqp=CAU', price: '10.99' },
      { id: "2", name: "Pepsi", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiByxQjdaBHgB0he4ip9G7w5nuYbbActS5pQ&usqp=CAU', price: '10.99' },
    ]
  }
  return data;
};

function Coke() {
  const { items } = useLoaderData();
  const navigate = useNavigate()
  return (
    <>
      <PageContent>
        <h1>Coke</h1>
        <Row gutter={16}>
          {items.map((item: any) => (
            <>
              <div className="site-card-wrapper">
                <Col span={6}>
                  <Card hoverable size='small' title={item.name} bordered={false}
                    style={{ width: 240 }} cover={<img alt="example" src={item.img} onClick={()=>navigate(`./${item.id}`)} />}>
                    <Meta title={item.name} description={`Price: ${item.price}`} />
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