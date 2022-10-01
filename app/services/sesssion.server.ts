// app/services/session.server.ts
import { createCookieSessionStorage, redirect } from '@remix-run/node';

// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session', // use any name you want here
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ['s3cr3t'], // replace this with an actual secret
    secure: process.env.NODE_ENV === 'production', // enable this in prod only
  },
});

export async function logout(request: Request) {
  let session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;

// define the user model
export type User = {
  name: string;
  token: string;
};