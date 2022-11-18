import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react"
import HeaderC from "~/components/Header"
import authenticator from "~/services/auth.service";
import { createUserSession, login, sessionStorage } from "~/services/sesssion.server";
import { getHeaderItems } from "~/utils/helper";
import headerItems from "../mock/headerItems"

type ActionData = {
  formError?: string;
  fieldErrors?: { username: string | undefined; password: string | undefined };
  fields?: { loginType: string; username: string; password: string };
};

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  let { loginType, username, password } = Object.fromEntries(
    await request.formData()
  );
    loginType = "login";
  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string"
) {
    return { formError: `Form not submitted correctly.` };
}


  let fields = { loginType, username, password }

  const user = await login({ username, password });
  if (!user) {
    return {
      fields,
      formError: `Username/Password combination is incorrect`,
    };
  }
  return createUserSession(user.id, "/products");
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
  const data = useLoaderData();
  let items = getHeaderItems(data, headerItems)
  const actionData = useActionData<ActionData | undefined>();
  return (
    <>
      <HeaderC items={items} selectedKey='Login' />
      <Form
                method="post"
                aria-describedby={
                    actionData?.formError ? "form-error-message" : undefined
                }
            >
                <div>
                    <label htmlFor="username-input">Username</label>
                    <input
                        type="text"
                        id="username-input"
                        name="username"
                        defaultValue={actionData?.fields?.username}
                        aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                        aria-describedby={
                            actionData?.fieldErrors?.username ? "username-error" : undefined
                        }
                    />
                    {actionData?.fieldErrors?.username ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="username-error"
                        >
                            {actionData.fieldErrors.username}
                        </p>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="password-input">Password</label>
                    <input
                        id="password-input"
                        name="password"
                        defaultValue={actionData?.fields?.password}
                        type="password"
                        aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                        aria-describedby={
                            actionData?.fieldErrors?.password ? "password-error" : undefined
                        }
                    />
                    {actionData?.fieldErrors?.password ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="password-error"
                        >
                            {actionData.fieldErrors.password}
                        </p>
                    ) : null}
                </div>
                <div id="form-error-message">
                {actionData?.formError ? (
                    <p className="form-validation-error" role="alert">
                        {actionData.formError}
                    </p>
                ) : null}
            </div>
            <button type="submit" className="button">
                Submit
            </button>
            </Form>
      <Outlet />
    </>
  )
}

export default Login