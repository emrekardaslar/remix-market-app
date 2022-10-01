import { useParams } from '@remix-run/react';
import PageContent from '~/components/UI/PageContent';

function WaterDetail() {
    const params = useParams();
    return (
        <PageContent>
            <h1>Water: {params.id}</h1>
        </PageContent>
    )
}

export default WaterDetail