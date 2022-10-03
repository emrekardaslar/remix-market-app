import { ItemType } from 'antd/lib/menu/hooks/useItems'
import React from 'react'
import { NotificationOutlined } from '@ant-design/icons';
import HeaderC from '~/components/Header'
import Sidebar from '~/components/Sidebar'
import headerItems from "../mock/headerItems"
import { sidebarMenu } from "../mock/sidebarItems"
import { Layout } from 'antd';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getHeaderItems } from '~/utils/helper';
import { getUserId } from '~/services/sesssion.server';
import { LoaderFunction, redirect } from '@remix-run/node';

export let loader: LoaderFunction = async ({ request }) => {
    let userId = await getUserId(request);
    return {user: userId};
};

function getSidebarItems(): ItemType[] {
    const sidebar = sidebarMenu;
    return sidebar.items.map((item => {
        return {
            key: item.name,
            icon: React.createElement(NotificationOutlined),
            label: item.name,
            children: item.subItems.map(subItem => {
                return {
                    key: subItem.name.replace(/\s+/g, '-').toLowerCase(),
                    label: subItem.name
                }
            })
        }
    }))
}

function Products() {
    const data = useLoaderData()
    let items = getHeaderItems(data, headerItems)
    return (
        <Layout>
            <HeaderC items={items} selectedKey="Products" />

            <Layout>
                <Sidebar items={getSidebarItems()} />
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                   <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Products