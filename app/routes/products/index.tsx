import { Product } from '@prisma/client'
import { LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { Hpl } from '~/components/UI/HorizontalPl'
import { db } from '~/utils/db.server'

export let loader: LoaderFunction = async () => {
  let products = await db.product.findMany({})

  let categoryNames = await db.product.groupBy({
    by: ['category'],
  })

  let names: any = []
  categoryNames.forEach((name) => names.push(name.category))

  return { products, names }
}

function Products() {
  const getObject = (products: any, names: any) => {
    let res: any = {}

    names.forEach((name: string) => {
      res[name] = []
      products.forEach((product: any) => {
        product.category == name && res[name].push(product)
      })
    })

    return res
  }

  const data = useLoaderData()
  const products = data.products
  const keys = data.names
  let productsObject = getObject(products, keys)
  const navigate = useNavigate()

  const clickHandler = (product: Product) => {
    navigate(`${product.category}/${product.subCategory}/${product.id}`)
  }

  return (
    <>
      {keys.map((key: string) => (
        <>
          <h1 style={{ fontWeight: 'bold', textTransform: 'capitalize', marginLeft: '0.3rem' }}>
            {key}
          </h1>
          <Hpl products={productsObject[key]} onClick={clickHandler} button={true} />
        </>
      ))}
      <Outlet />
    </>
  )
}

export default Products
