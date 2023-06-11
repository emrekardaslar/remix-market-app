import React from 'react'
import { NotificationOutlined } from '@ant-design/icons'
import Sidebar from '~/components/Sidebar'
import { SidebarMenu } from '../models/sidebarMenu'
import { Outlet, useLoaderData } from '@remix-run/react'
import { capitalizeFirstLetter } from '~/utils/helper'
import { getUserId } from '~/services/sesssion.server'
import { ActionFunction, LoaderFunction, MetaFunction, redirect } from '@remix-run/node'
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

export const action: ActionFunction = async ({ request }): Promise<any> => {
  const formData = await request.formData()
  const filters = JSON.parse(formData.get('filterChange') as string)?.filteredProducts
  const location = JSON.parse(formData.get('filterChange') as string)?.location

  let params = filters?.map((brand: string) => {
    let str = '?brand='
    str += brand
    return str
  })

  if (filters.length == 0) {
    params = ''
  }

  if (formData && filters) {
    return redirect(`${location}${params}`)
    //return redirect(`/products/electronics/computers${params}`)
  }
  return {}
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
  return (
    <>
      <div className='container'>
        <Sidebar items={getSidebarItems(data.categoryObject)} />
        <Outlet />
      </div>
    </>
  )
}

export default Products
