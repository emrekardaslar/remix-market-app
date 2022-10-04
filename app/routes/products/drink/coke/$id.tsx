import { json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react'
import { Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import PageContent from '~/components/UI/PageContent';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({params}) => {
    return json(
        await db.product.findFirst({
            where: {
                id: params.id
            }
        })
    )
};

function CokeDetail() {
    const coke = useLoaderData()
    return (
        <div>
            <PageContent>
                <h1>{coke.name}</h1>
                <Row gutter={60}>
                  
                        <Card
                            style={{ width: 240 }}
                            cover={<img alt={coke.name} src={coke.imgLink} />}
                        >
                            <Meta title={coke.name} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo veniam quo nesciunt amet expedita dignissimos error voluptas, distinctio saepe aut. Nemo assumenda temporibus vero aliquid! Recusandae provident laborum perferendis tempore?"} />
                        </Card>
                       
                    <Meta title={coke.name} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo veniam quo nesciunt amet expedita dignissimos error voluptas, distinctio saepe aut. Nemo assumenda temporibus vero aliquid! Recusandae provident laborum perferendis tempore?"} />
                </Row>
            </PageContent>
            <Outlet />
        </div>
    )
}

export default CokeDetail