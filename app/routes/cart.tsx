import { LoaderFunction, redirect, ActionFunction } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { Space, Table } from "antd";
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
    let currentIndex = -1;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',            
            render: (text: any) => {currentIndex++; return <span>{text}</span>}
            
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: any) => <span>{text}</span>,
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            render: (text: any) => <span>{cartItems[currentIndex] !== undefined ? text * cartItems[currentIndex].quantity : text}</span>,
        },
    ];
    
    const data = useLoaderData();
    let items = getHeaderItems(data, headerItems)
    const [cartItems1, setCartItems1] = useState<any>([])
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems
    } = useShoppingCart()

    useEffect(() => {
        setCartItems1(cartItems)
    }, [cartItems])

    return (
        <>
            <HeaderC items={items} selectedKey='Cart' />
            <Outlet />
            <h2>
                Total Items <strong>({cartItems1.length})</strong>
            </h2>
            <Table columns={columns} dataSource={cartItems1}  />
            {/*           <div className="shopping-cart">
            <h4>Cart</h4>
                {cartItems1.map((item: any) => (
                    <>
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                    </>
                ))}
            </div> */}
        </>
    )
}

export default Cart