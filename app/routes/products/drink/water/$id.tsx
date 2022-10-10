import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Row, Card } from 'antd';
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

function WaterDetail() {
    const water = useLoaderData()
    return (
        <PageContent>
        <h1>{water.name}</h1>
        <Row gutter={60}>
          
                <Card
                    style={{ width: 240 }}
                    cover={<img alt={water.name} src={water.imgLink} />}
                >
                    <Meta title={water.name} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo veniam quo nesciunt amet expedita dignissimos error voluptas, distinctio saepe aut. Nemo assumenda temporibus vero aliquid! Recusandae provident laborum perferendis tempore?"} />
                </Card>
               
            <Meta title={water.name} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo veniam quo nesciunt amet expedita dignissimos error voluptas, distinctio saepe aut. Nemo assumenda temporibus vero aliquid! Recusandae provident laborum perferendis tempore?"} />
        </Row>
    </PageContent>
    )
}

export default WaterDetail