import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

interface Props {
    items: ItemType[]
}

function HeaderC(props: Props) {
    return (
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={props.items} />
        </Header>
    )
}

export default HeaderC