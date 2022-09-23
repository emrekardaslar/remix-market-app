import { Outlet, useParams } from '@remix-run/react'
import PageContent from '~/components/UI/PageContent';

function CokeDetail() {
    const params = useParams();
    return (
        <div>
            <PageContent>
                <h1>Coke: {params.id}</h1>
            </PageContent>
            <Outlet />
        </div>
    )
}

export default CokeDetail