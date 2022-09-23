import { useParams } from '@remix-run/react'
import PageContent from '~/components/UI/PageContent'

function ChocolateDetail() {
 const params = useParams()
  return (
    <PageContent>
        <h1>Chocolate: {params.id}</h1>
    </PageContent>
  )
}

export default ChocolateDetail