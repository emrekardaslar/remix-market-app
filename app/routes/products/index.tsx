import { Product } from "@prisma/client"
import { LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react"
import { Hpl } from "emrekardaslar-uikit"
import { db } from "~/utils/db.server"

export let loader: LoaderFunction = async ({ request }) => {
  let drink = await db.product.findMany(
    {
      where: {
        category: 'drink'
      }
    }
  );

  let food = await db.product.findMany(
    {
      where: {
        category: 'food'
      },
    }
  );


  return { drink, food }
}

function Products() {
  const data = useLoaderData();
  const keys = Object.keys(data);
  const navigate = useNavigate();

  const clickHandler = (product: Product) => {
    navigate(`${product.category}/${product.subCategory}/${product.id}`)
  }

  return (
    <>
      {keys.map(key =>
      (
        <>
          <h1 style={{ fontWeight: "bold", textTransform: "capitalize", marginLeft: "0.3rem" }}>{key}</h1>
          <Hpl products={data[key]} onClick={clickHandler} button={true} />
        </>
      )
      )}
      <Outlet />
    </>
  )
}

export default Products