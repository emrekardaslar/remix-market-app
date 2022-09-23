import { Link } from "@remix-run/react"
import PageContent from "~/components/UI/PageContent"

function Water() {
  return (
    <PageContent>
        <div>Water</div>
        <Link to="./1">Water 1</Link>
        <Link to="./2">Water 2</Link>
    </PageContent>
  )
}

export default Water