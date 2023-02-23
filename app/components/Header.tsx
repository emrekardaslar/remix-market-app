import { useNavigate, useSubmit } from '@remix-run/react'
import { Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

interface Props {
  items: ItemType[]
  selectedKey?: string
}

function HeaderC(props: Props) {
  const navigate = useNavigate()
  const submit = useSubmit()

  async function logout() {
    submit(null, { method: 'post', action: '/logout' })
  }

  return (
    <Header className='header'>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={[props.selectedKey ? props.selectedKey : '']}
        items={props.items}
        onClick={(item) => {
          item.key == 'Logout'
            ? logout()
            : navigate('/' + item.key.replace(/\s+/g, '-').toLowerCase())
        }}
      />
    </Header>
  )
}

export default HeaderC
