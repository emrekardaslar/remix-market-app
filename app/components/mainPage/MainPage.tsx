import { Layout } from 'antd'
import headerItems from '../../mock/headerItems'
import HeaderC from '../Header'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar'
import useViewModel from "./mainPageViewModel"

function MainPage() {
  const {getSidebarItems} =  useViewModel();
  return (
    <Layout>
    <HeaderC items={headerItems} />

    <Layout>
      <Sidebar items={getSidebarItems()} />
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <PageContent />
      </Layout>
    </Layout>
  </Layout>
  )
}

export default MainPage