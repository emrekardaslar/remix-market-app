import { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react'
import { Card, Col, Divider, Rate, Row, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';
import PageContent from '~/components/UI/PageContent';

export const loader: LoaderFunction = async () => {
    const item = {
        id: 1,
        name: 'Coca-cola',
        img: 'https://image.influenster.com/eyJidWNrZXQiOiAiaW5mbHVlbnN0ZXJfcHJvZHVjdGlvbiIsICJrZXkiOiAibWVkaWEvcHJvZHVjdC9pbWFnZS9wcm9kdWN0L2ltYWdlL2RxdGxhanNmbnJ5cXlqNHduaWJmX0VCOGcxY0oucG5nIiwgImVkaXRzIjogeyJyb3RhdGUiOiBudWxsLCAicmVzaXplIjogeyJ3aWR0aCI6IDc1MCwgImhlaWdodCI6IDc1MCwgImZpdCI6ICJpbnNpZGUiLCAiYmFja2dyb3VuZCI6IHsiciI6IDEsICJnIjogMSwgImIiOiAxLCAiYWxwaGEiOiAwfSwgIndpdGhvdXRFbmxhcmdlbWVudCI6IHRydWV9fSwgImV4dGVuZCI6IHt9fQ=='
    }
    return item;
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
                            cover={<img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgT-aVvy9-AaxbhqALWPPBtzkmsi-1_z5Zw&usqp=CAU" />}
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