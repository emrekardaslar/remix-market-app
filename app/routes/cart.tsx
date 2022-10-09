import { LoaderFunction, redirect, ActionFunction } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { Button, Card } from "antd";
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
    return { user: userId };
};

export const action: ActionFunction = async ({ request }) => {
    await authenticator.logout(request, { redirectTo: "/login" });
};

function Cart() {
    const data = useLoaderData();
    let items = getHeaderItems(data, headerItems)
    const [cartItems1, setCartItems1] = useState<any>([])
    const [total, setTotal] = useState(0.0)
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems
    } = useShoppingCart()

    function setTotalCost() {
        let total = 0
        cartItems.forEach((item: any) => {
            total += item.price * item.quantity
        })
        setTotal(total)
    }

    function createOrder() {
        console.log(cartItems)
    }

    useEffect(() => {
        setCartItems1(cartItems)
        setTotalCost()
    }, [cartItems])

    return (
        <>
            <HeaderC items={items} selectedKey='Cart' />
            <Outlet />
            <div style={{ margin: "1rem" }}>
                <h2>
                    Total Items <strong>({cartItems1.length})</strong>
                </h2>
                <h4>Cart</h4>
                {cartItems1.map((item: any) => (
                    <Card>
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price * item.quantity}</p>
                        <Button type="primary" shape="circle" style={{ marginRight: "1rem" }} onClick={() => increaseCartQuantity(item.id, item.name, item.price)}>+</Button>
                        <Button shape="circle" onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                    </Card>
                ))}
                <h2>
                    Total Price <strong>{total}</strong>
                </h2>
                <Button type="primary" onClick={createOrder}>Create Order</Button>
            </div>
        </>
    )
}

export default Cart