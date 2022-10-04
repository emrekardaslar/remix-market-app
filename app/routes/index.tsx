import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserId } from "~/services/sesssion.server";
import Products from "./products";

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request);
  if (!userId) redirect("/login")
  else redirect("/products")
  return {user: userId};
};

export default function MainIndex() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Products/>
      <Outlet/> 
    </div>
  );
}
