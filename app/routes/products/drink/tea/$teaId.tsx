import { useParams } from '@remix-run/react';
import PageContent from '~/components/UI/PageContent';

function $teaId() {
    const params = useParams();
    return (
        <PageContent>
            <h1>Water: {params.teaId}</h1>
        </PageContent>
    )
}

export default $teaId