import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react'
import HeaderC from '~/components/Header'
import authenticator from '~/services/auth.service';
import headerItems from "../mock/headerItems"

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

function Orders() {
  return (
    <>
        <HeaderC items={headerItems} selectedKey='Orders' />
        <Outlet />
    </>
  )
}

export default Orders