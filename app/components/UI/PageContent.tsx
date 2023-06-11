import { useLocation } from '@remix-run/react'
import { Breadcrumb } from 'antd'

function PageContent(props: any) {
  let location = useLocation()
  const breadcrumbItems = location.pathname.split('/')
  return (
    <div className='content-container'>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>{breadcrumbItems[1]}</Breadcrumb.Item>
        <Breadcrumb.Item>{breadcrumbItems[2]}</Breadcrumb.Item>
        <Breadcrumb.Item>{breadcrumbItems[3]}</Breadcrumb.Item>
      </Breadcrumb>
      {props.children}
    </div>
  )
}

export default PageContent
