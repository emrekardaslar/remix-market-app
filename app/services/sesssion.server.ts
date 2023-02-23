// app/services/session.server.ts
import { createCookieSessionStorage, redirect } from '@remix-run/node'
import bcrypt from 'bcrypt'

import { db } from '../utils/db.server'

type LoginForm = {
  username: string
  password: string
}

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
})

export async function logout(request: Request) {
  let session = await getSession(request.headers.get('Cookie'))
  return redirect('/login', {
    headers: { 'Set-Cookie': await destroySession(session) },
  })
}

export async function register({ username, password }: LoginForm) {
  let passwordHash = await bcrypt.hash(password, 10)
  return db.user.create({
    data: { username, passwordHash },
  })
}

export async function login({ username, password }: any) {
  const user = await db.user.findUnique({ where: { username } })
  if (!user) return null
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
  if (!isCorrectPassword) return null
  return user
}

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage

// define the user model
export type User = {
  name: string
  token: string
}

export async function createUserSession(userId: string, redirectTo: string) {
  let session = await getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}

export function getUserSession(request: Request) {
  return getSession(request.headers.get('Cookie'))
}

export async function getUserId(request: Request) {
  let session = await getUserSession(request)
  let userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}
