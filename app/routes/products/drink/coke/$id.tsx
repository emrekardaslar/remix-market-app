import { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData, useParams } from '@remix-run/react'
import PageContent from '~/components/UI/PageContent';

export const loader: LoaderFunction = async () => {
    const item = {
        id: 1,
        name: 'Coca-cola',
        img: 'url'
    }
    return item;
};

function CokeDetail() {
    const coke = useLoaderData()
    const params = useParams();
    return (
        <div>
            <PageContent>
                <h1>Coke: {coke.name}</h1>
                <img src={coke.img}/>
            </PageContent>
            <Outlet />
        </div>
    )
}

export default CokeDetail