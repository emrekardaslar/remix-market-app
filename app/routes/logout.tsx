import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { logout } from "~/services/sesssion.server";


export let action: ActionFunction = async ({ request }) => {
  console.log(request)
  return logout(request);
};

export let loader: LoaderFunction = async () => {
  return redirect("/");
};