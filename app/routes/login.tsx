import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react"
import HeaderC from "~/components/Header"
import authenticator from "~/services/auth.service";
import { sessionStorage } from "~/services/sesssion.server";
import headerItems from "../mock/headerItems"

export const action: ActionFunction = async ({ request, context }) => {
  const resp = await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
    throwOnError: true,
    context,
  });
  return resp;
};


export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/"
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const error = session.get("sessionErrorKey");
  return json<any>({ error });
};

function Login() {
  const loaderData = useLoaderData();
  return (
    <>
      <HeaderC items={headerItems} selectedKey='Login' />
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>Welcome to Remix-Auth Example</h1>
        <p>
          Based on the Form Strategy From{" "}
          <a href="https://github.com/sergiodxa/remix-auth" target={"_window"}>
            Remix-Auth Project
          </a>
        </p>
        <Form method="post">
          <input type="email" name="email" placeholder="email" required />
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
          />
          <button>Sign In</button>
        </Form>
        <div>
          {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Login