import { Product } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Hpl } from "emrekardaslar-uikit";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request, params }) => {
    const category = params.category;
    let products = await db.product.findMany(
        {
            where: {
                category: category
            }
        }
    );

    return { products, category }
}


function CategorySlug() {
    const data = useLoaderData()
    const navigate = useNavigate();
    const clickHandler = (product: Product) => {
        navigate(`${product.subCategory}/${product.id}`)
    }

    return (
        <>
            <h1 style={{ fontWeight: "bold", textTransform: "capitalize", marginLeft: "0.3rem" }}>{data.category}</h1>
            <Hpl products={data.products} onClick={clickHandler} button={true} />
        </>
    )
}

export default CategorySlug