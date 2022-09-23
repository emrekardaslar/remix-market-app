import { Outlet, useParams } from '@remix-run/react'
import PageContent from '~/components/UI/PageCon';

function $cokeId() {
    const params = useParams();
    return (
        <div>
            <PageContent>
                <h1>Coke: {params.cokeId}</h1>
            </PageContent>
            <Outlet />
        </div>
    )
}

export default $cokeId