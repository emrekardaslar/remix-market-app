import { Form, useNavigate } from '@remix-run/react';
import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

interface Props {
    items: ItemType[],
    selectedKey?: string
}

function HeaderC(props: Props) {
    const navigate = useNavigate()
    return (
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" 
            defaultSelectedKeys={[props.selectedKey ? props.selectedKey : '']} 
            items={props.items} 
            onClick={(item)=>{navigate('/' + item.key.replace(/\s+/g, '-').toLowerCase())}}
            />
{/*             <Form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
            </Form> */}
        </Header>
    )
}

export default HeaderC