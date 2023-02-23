import { HeartOutlined } from '@ant-design/icons'
import { LoaderFunction, ActionFunction, redirect, MetaFunction } from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData, useNavigate } from '@remix-run/react'
import { Row, Col, Card, Button, notification } from 'antd'
import HeaderC from '~/components/Header'
import { getUserId } from '~/services/sesssion.server'
import { db } from '~/utils/db.server'
import { getHeaderItems } from '~/utils/helper'
import headerItems from '../mock/headerItems'
import Meta from 'antd/lib/card/Meta'
import { useShoppingCart } from '~/context/CartContext'

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request)
  if (!userId) throw redirect('/login')
  const favoriteList = await db.favoriteList.findMany({
    where: {
      userId: userId,
    },
    select: {
      productId: true,
    },
  })

  let list: any = []
  favoriteList.forEach((item) => list.push(item.productId))

  const favoriteProducts = await db.product.findMany({
    where: {
      id: {
        in: list,
      },
    },
  })

  return { user: userId, favoriteList: favoriteProducts, baseUrl: process.env.REACT_APP_BASE_URL }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const addToFavorite = JSON.parse(formData.get('addToFavorite') as string)
  if (formData && addToFavorite) {
    const favorited = await db.favoriteList.findFirst({
      where: {
        productId: addToFavorite.productId,
        userId: addToFavorite.userId,
      },
    })
    if (!favorited) {
      await db.favoriteList.create({
        data: {
          productId: addToFavorite.productId,
          userId: addToFavorite.userId,
        },
      })
    } else {
      await db.favoriteList.delete({
        where: {
          userId_productId: {
            productId: addToFavorite.productId,
            userId: addToFavorite.userId,
          },
        },
      })
    }
  }
  return {}
}

export const meta: MetaFunction<typeof loader> = () => {
  return {
    title: 'Favorite List',
    description: 'Your favorite products',
  }
}

function FavoriteList() {
  const data = useLoaderData()
  let items = getHeaderItems(data, headerItems)
  const navigate = useNavigate()
  const { increaseCartQuantity } = useShoppingCart()
  const fetcher = useFetcher()

  const cartAddedNotification = (name: string, price: number) => {
    notification.open({
      message: `${name} added to your cart`,
      description: `${name} added to your cart for  $ ${price}`,
      onClick: () => {
        navigate('/cart')
      },
    })
  }

  const removeFromFavorites = (productId: any) => {
    fetcher.submit(
      { addToFavorite: JSON.stringify({ productId: productId, userId: data.user }) },
      { method: 'post' },
    )
  }

  return (
    <>
      <HeaderC items={items} selectedKey='Favorite List' />
      <Outlet />
      <br></br>
      <Row key={Math.random()} gutter={16}>
        {data.favoriteList.map((item: any) => (
          <>
            <div className='site-card-wrapper'>
              <Col span={6}>
                <Card
                  key={item.id}
                  hoverable
                  title={item.name}
                  bordered={false}
                  style={{ width: '15rem' }}
                  cover={
                    <div style={{ overflow: 'hidden', height: '15rem' }}>
                      <img
                        alt='example'
                        style={{ height: '100%' }}
                        src={item.imgLink}
                        onClick={() =>
                          (window.location.href = `http://${data.baseUrl}/products/${item.category}/${item.subCategory}/${item.id}`)
                        }
                      />
                    </div>
                  }
                >
                  <Meta key={item.id} title={item.name} description={`Price: ${item.price}`} />
                  <br></br>
                  <Button
                    type='primary'
                    onClick={() => {
                      increaseCartQuantity(item.id, item.name, item.price)
                      cartAddedNotification(item.name, item.price)
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    style={{ marginLeft: '1rem' }}
                    type={'primary'}
                    shape='circle'
                    icon={<HeartOutlined />}
                    danger
                    onClick={() => {
                      removeFromFavorites(item.id)
                    }}
                  ></Button>
                </Card>
              </Col>
            </div>
          </>
        ))}
      </Row>
    </>
  )
}

export default FavoriteList
