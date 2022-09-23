import { useParams } from '@remix-run/react';
import PageContent from '~/components/UI/PageContent';

function $waterId() {
    const params = useParams();
    return (
        <PageContent>
            <h1>Water: {params.waterId}</h1>
        </PageContent>
    )
}

export default $waterId