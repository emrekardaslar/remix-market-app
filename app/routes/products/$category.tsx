import { Product } from '@prisma/client'
import { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'
import { Hpl } from '~/components/UI/HorizontalPl'
import { db } from '~/utils/db.server'
import styles from "../../styles/global.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export let loader: LoaderFunction = async ({ request, params }) => {
  const category = params.category
  let products = await db.product.findMany({
    where: {
      category: category,
    },
  })

  return { products, category }
}

function Category() {
  const data = useLoaderData()

  return (
    <>
      <Link prefetch="render" to="/products/food/chocolate/058eceac-1c5b-4430-ace2-5b60fc844e1f">Dashboard</Link>{" "}
      <h1 style={{ fontWeight: 'bold', textTransform: 'capitalize', marginLeft: '0.3rem' }}>
        {data.category}
      </h1>
      <Hpl products={data.products} base={"category"} button={true} />
    </>
  )
}

export default Category
