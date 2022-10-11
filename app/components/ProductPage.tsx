import { Row, Card, Button, Col, Avatar, Comment, Input, Form, List, Rate, Pagination } from "antd"
import Meta from "antd/lib/card/Meta"
import moment from "moment";
import { useState } from "react";
import { useShoppingCart } from "~/context/CartContext"
import PageContent from "./UI/PageContent"


const { TextArea } = Input;

interface CommentItem {
    author: string;
    avatar: string;
    content: React.ReactNode;
    datetime: string;
}

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

const CommentList = ({ comments }: { comments: CommentItem[] }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

interface ProductPageProps {
    product: any
}

function ProductPage({ product }: ProductPageProps) {
    const {
        increaseCartQuantity,
    } = useShoppingCart()

    const [comments, setComments] = useState<CommentItem[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (!value) return;

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            setComments([
                ...comments,
                {
                    author: 'Han Solo',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: <p>{value}</p>,
                    datetime: moment('2016-11-22').fromNow(),
                },
            ]);
        }, 1000);
    }


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
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
                        <Rate allowHalf defaultValue={4.5} />
                        <h4>Price: ${product.price}</h4>
                        <Meta description={product.description} />
                        <br></br>
                        <Button type='primary' onClick={() => increaseCartQuantity(product.id, product.name, product.price)}>Add to Cart</Button>
                        <>
                            {comments.length > 0 && <CommentList comments={comments} />}
                            <Comment
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                content={
                                    <Editor
                                        onChange={handleChange}
                                        onSubmit={handleSubmit}
                                        submitting={submitting}
                                        value={value}
                                    />
                                }
                            />
                            <Pagination defaultCurrent={1} total={50} />
                        </>
                    </Col>
                </Row>
            </>
        </PageContent>
    )
}

export default ProductPage