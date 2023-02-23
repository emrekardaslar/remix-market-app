import React from 'react'
import { NotificationOutlined } from '@ant-design/icons'
import HeaderC from '~/components/Header'
import Sidebar from '~/components/Sidebar'
import headerItems from '../mock/headerItems'
import { SidebarMenu } from '../models/sidebarMenu'
import { Layout } from 'antd'
import { Outlet, useLoaderData } from '@remix-run/react'
import { capitalizeFirstLetter, getHeaderItems } from '~/utils/helper'
import { getUserId } from '~/services/sesssion.server'
import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { db } from '~/utils/db.server'

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request)
  let cNameQuery = await db.product.groupBy({
    by: ['category'],
  })
  let categoryObject: SidebarMenu = { items: [] }
  let categoryNames: any = []
  cNameQuery.forEach((name) => {
    categoryNames.push(name.category)
    categoryObject.items.push({ name: name.category, subItems: [] })
  })

  let products = await db.product.findMany({})

  products.forEach((product) => {
    categoryObject.items.forEach((item: any) => {
      item.name == product.category &&
        item.subItems.findIndex((a: any) => a.name == product.subCategory) == -1 &&
        item.subItems.push({ name: product.subCategory, subItems: [] })
    })
  })

  return { user: userId, categoryNames, categoryObject }
}

export const meta: MetaFunction<typeof loader> = () => {
  return {
    title: 'Products',
    description: 'Products in the Market App',
  }
}

function getSidebarItems(categoryObject: any): any[] {
  const sidebar = categoryObject
  return sidebar.items.map((item) => {
    return {
      key: item.name,
      icon: React.createElement(NotificationOutlined),
      label: capitalizeFirstLetter(item.name),
      children: item.subItems.map((subItem) => {
        return {
          key: subItem.name.replace(/\s+/g, '-').toLowerCase(),
          label: capitalizeFirstLetter(subItem.name),
        }
      }),
    }
  })
}

function Products() {
  const data = useLoaderData()
  let items = getHeaderItems(data, headerItems)
  return (
    <Layout>
      <HeaderC items={items} selectedKey='Products' />

      <Layout>
        <Sidebar items={getSidebarItems(data.categoryObject)} />
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Products
