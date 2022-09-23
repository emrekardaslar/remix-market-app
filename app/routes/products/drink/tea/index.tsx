import { Link } from "@remix-run/react"
import PageContent from "~/components/UI/PageContent"

function Water() {
  return (
    <PageContent>
        <div>Tea</div>
        <Link to="./1">Tea 1</Link>
        <Link to="./2">Tea 2</Link>
    </PageContent>
  )
}

export default Water