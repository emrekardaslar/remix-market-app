import { LoaderFunction, redirect, ActionFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData, Outlet, Form, useActionData } from '@remix-run/react'
import { Button, Card } from 'antd'
import { useEffect, useState } from 'react'
import HeaderC from '~/components/Header'
import { useShoppingCart } from '~/context/CartContext'
import headerItems from '~/mock/headerItems'
import { getUserId } from '~/services/sesssion.server'
import { db } from '~/utils/db.server'
import { getHeaderItems } from '~/utils/helper'
import { v4 as uuidv4 } from 'uuid'

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request)
  if (!userId) throw redirect('/login')
  return { user: userId }
}

export const meta: MetaFunction<typeof loader> = () => {
  return {
    title: 'Cart',
    description: 'Your cart',
  }
}

export const action: ActionFunction = async ({ request }) => {
  let done = false
  let formData = await request.formData()
  const user = JSON.parse(formData.get('data')).user
  const data = JSON.parse(formData.get('data')).data
  let orderId = uuidv4()

  const order = await db.order.create({
    data: {
      id: orderId,
      userId: user,
    },
  })

  const orderItems = data.map(async (item: any) => {
    await db.orderItem.create({
      data: {
        orderId: orderId,
        productId: item.id,
        quantity: item.quantity,
      },
    })
  })

  if (orderItems && order) {
    done = true
  }

  return { done: done }
}

function Cart() {
  const data = useLoaderData()
  const actionData = useActionData()
  let items = getHeaderItems(data, headerItems)
  const [cartItems1, setCartItems1] = useState<any>([])
  const [total, setTotal] = useState(0.0)

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
    clearCart,
  } = useShoppingCart()

  function setTotalCost() {
    let total = 0
    cartItems.forEach((item: any) => {
      total += item.price * item.quantity
    })
    setTotal(Number(total).toFixed(2))
  }

  useEffect(() => {
    setCartItems1(cartItems)
    setTotalCost()
  }, [cartItems])

  useEffect(() => {
    if (actionData && actionData.done) {
      localStorage.clear()
      setCartItems1([])
      clearCart()
    }
  }, [actionData])

  return (
    <>
      <HeaderC items={items} selectedKey='Cart' />
      <Outlet />
      <div style={{ margin: '1rem' }}>
        {cartItems1.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          <>
            <h2>
              Total Items <strong>({cartItems1.length})</strong>
            </h2>
            {cartItems1.map((item: any) => (
              <Card>
                <p>Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {(item.price * item.quantity).toFixed(2)}</p>
                <Button
                  type='primary'
                  shape='circle'
                  style={{ marginRight: '1rem' }}
                  onClick={() => increaseCartQuantity(item.id, item.name, item.price)}
                >
                  +
                </Button>
                <Button shape='circle' onClick={() => decreaseCartQuantity(item.id)}>
                  -
                </Button>
              </Card>
            ))}
            <h2>
              Total Price <strong>{total}</strong>
            </h2>
            <Form method='post'>
              <input
                type='hidden'
                name='data'
                defaultValue={JSON.stringify({ user: data.user, data: cartItems1 })}
              />
              <button className='ant-btn ant-btn-primary' type='submit'>
                Create Order
              </button>
            </Form>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
