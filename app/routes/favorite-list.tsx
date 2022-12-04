import { LoaderFunction, ActionFunction, redirect, MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react"
import HeaderC from "~/components/Header"
import authenticator from "~/services/auth.service";
import { getUserId } from "~/services/sesssion.server";
import { getHeaderItems } from "~/utils/helper";
import headerItems from "../mock/headerItems"

export let loader: LoaderFunction = async ({ request }) => {
    let userId = await getUserId(request);
    if (!userId) throw redirect('/login')
    return {user: userId};
};

export const action: ActionFunction = async ({ request }) => {
    await authenticator.logout(request, { redirectTo: "/login" });
};

export const meta: MetaFunction<typeof loader> = () => {
    return {
      title: "Favorite List",
      description: "Your favorite products"
    };
};

function FavoriteList() {
    const data = useLoaderData();
    let items = getHeaderItems(data, headerItems)
    return (
        <>
            <HeaderC items={items} selectedKey='Favorite List' />
            <Outlet />
        </>
    )
}

export default FavoriteList