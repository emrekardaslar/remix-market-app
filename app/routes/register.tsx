import { ActionFunction } from '@remix-run/node';
import { Form, Outlet, useActionData } from '@remix-run/react'
import HeaderC from '~/components/Header'
import { register } from '~/services/sesssion.server';
import { db } from '~/utils/db.server';
import headerItems from "../mock/headerItems"
import { createUserSession } from "../services/sesssion.server";

type ActionData = {
    formError?: string;
    fieldErrors?: { username: string | undefined; password: string | undefined };
    fields?: { loginType: string; username: string; password: string };
}

export let action: ActionFunction = async ({
    request,
}): Promise<Response | ActionData | undefined> => {
    let { loginType, username, password } = Object.fromEntries(
        await request.formData()
    );

    loginType = 'register'

    if (
        typeof loginType !== "string" ||
        typeof username !== "string" ||
        typeof password !== "string"
    ) {
        return { formError: `Form not submitted correctly.` };
    }

    let fields = { loginType, username, password }

    let userExists = await db.user.findFirst({ where: { username } });

    if (loginType === 'register') {
        if (userExists) {
            return {
                fields,
                formError: `User with username ${username} already exists`,
            };
        }
        const user = await register({ username, password });
        if (!user) {
            return {
                fields,
                formError: `Something went wrong trying to create a new user.`,
            };
        }
        return createUserSession(user.id, "/products");
    }
};

function Register() {
    const actionData = useActionData<ActionData | undefined>();
    return (
        <>
            <HeaderC items={headerItems} selectedKey='Register' />
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

export default Register