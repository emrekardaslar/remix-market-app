import { LoaderFunction, redirect, ActionFunction } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import HeaderC from "~/components/Header";
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
    return (
        <>
            <HeaderC items={items} selectedKey='Cart' />
            <Outlet />
        </>
    )
}

export default Cart