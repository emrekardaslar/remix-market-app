import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { Outlet } from '@remix-run/react'
import HeaderC from '~/components/Header'
import authenticator from '~/services/auth.service';
import { getUserId } from '~/services/sesssion.server';
import headerItems from "../mock/headerItems"

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request);
  if (!userId) throw redirect('/login')
  return {};
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