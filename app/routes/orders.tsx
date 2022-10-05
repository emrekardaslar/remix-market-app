import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react'
import { Card, Col, Row, Space } from 'antd';
import HeaderC from '~/components/Header'
import authenticator from '~/services/auth.service';
import { getUserId } from '~/services/sesssion.server';
import { db } from '~/utils/db.server';
import { getHeaderItems } from '~/utils/helper';
import headerItems from "../mock/headerItems"

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
  return { user: userId, orders: orders };
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

function Orders() {
  const data = useLoaderData()
  let items = getHeaderItems(data, headerItems)

  return (
    <>
      <HeaderC items={items} selectedKey='Orders' />
      <Outlet />
      <Row key={Math.random()} gutter={16}>
        {data.orders.map((item: any) => (
          <>
            <div className="site-card-wrapper">
              <Col span={6}>
                <Card title={item.id} style={{ width: 300 }}>
                  <p>Created at: {item.createdAt}</p>
                </Card>
              </Col>
            </div>
          </>
        ))}
      </Row>
    </>
  )
}

export default Orders