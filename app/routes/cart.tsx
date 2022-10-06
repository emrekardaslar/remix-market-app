import { LoaderFunction, redirect, ActionFunction } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import HeaderC from "~/components/Header";
import { useShoppingCart } from "~/context/CartContext";
import headerItems from "~/mock/headerItems";
import authenticator from "~/services/auth.service";
import { getUserId } from "~/services/sesssion.server";
import { getHeaderItems } from "~/utils/helper";

export let loader: LoaderFunction = async ({ request }) => {
    let userId = await getUserId(request);
    if (!userId) throw redirect('/login')
    return {user: userId};
};

export const action: ActionFunction = async ({ request }) => {
    await authenticator.logout(request, { redirectTo: "/login" });
};

function Cart() {
    const data = useLoaderData();
    let items = getHeaderItems(data, headerItems)
    const [cartItems1, setCartItems1] = useState([])
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems
      } = useShoppingCart()

    useEffect(()=>{
        setCartItems1(cartItems)
    }, [cartItems])
    return (
        <>
            <HeaderC items={items} selectedKey='Cart' />
            <Outlet />
            <h4>Cart</h4>
            {cartItems1.map((item) => (
                <>
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                </>
            ))}
        </>
    )
}

export default Cart