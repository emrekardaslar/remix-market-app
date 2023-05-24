import { FavoriteList, Product } from '@prisma/client'
import { ActionFunction, LoaderFunction, MetaFunction, redirect } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import CategoryPage from '~/components/CategoryPage'
import { getUserId } from '~/services/sesssion.server'
import { db } from '~/utils/db.server'
import { capitalizeFirstLetter } from '~/utils/helper'
import { useCatch } from '@remix-run/react'
import { Filter } from '~/components/Filter'
import { useEffect, useState } from 'react'

export const loader: LoaderFunction = async ({ request, params }) => {
  let userId = await getUserId(request)
  let favoriteList: FavoriteList[] = []
  if (userId) {
    favoriteList = await db.favoriteList.findMany({
      where: {
        userId: userId,
      },
    })
  }

  let products = await db.product.findMany({
    where: {
      subCategory: params.subcategory,
    },
  })

  let list: any = []

  products.forEach((product) => {
    favoriteList.forEach((item) => {
      item.productId == product.id && list.push(product)
    })
  })

  return { products, list, userId }
}

export const action: ActionFunction = async ({ request, params }): Promise<any> => {
  let userId = await getUserId(request)
  if (!userId) throw redirect('/login')
  const formData = await request.formData()
  const addToFavorite = JSON.parse(formData.get('addToFavorite') as string)
  if (formData && addToFavorite) {
    const favorited = await db.favoriteList.findFirst({
      where: {
        productId: addToFavorite.productId,
        userId: addToFavorite.userId,
      },
    })
    if (!favorited) {
      await db.favoriteList.create({
        data: {
          productId: addToFavorite.productId,
          userId: addToFavorite.userId,
        },
      })
    } else {
      await db.favoriteList.delete({
        where: {
          userId_productId: {
            productId: addToFavorite.productId,
            userId: addToFavorite.userId,
          },
        },
      })
    }
  }
  return {}
}

export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const { subcategory } = params
  return {
    title: capitalizeFirstLetter(`${subcategory}`),
    description: subcategory,
  }
}

export default function Subcategory() {
  const data = useLoaderData()
  const [products, setProducts] = useState(data.products)
  const location = useLocation()
  let brandList: string[] = []
  data.products.forEach((product: Product) => {
    if (!brandList.includes(product.brand) && product.brand != '') brandList.push(product.brand)
  })

  useEffect(() => {
    setProducts(data.products)
  }, [location])

  return (
    <>
      <Filter items={brandList} products={data.products} setProducts={setProducts} />
      <CategoryPage data={products} favoriteList={data.list} userId={data.userId} />
      <Outlet />
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <div className='error-container'>Sorry, cannot load the subcategory</div>
}
