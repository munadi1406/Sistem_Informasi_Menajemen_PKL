/* eslint-disable react-refresh/only-export-components */
import { useInfiniteQuery } from 'react-query';
import WithContaierModal from '../../utils/WithContainerModal'
import { getListTemplateSertifikat } from '../../api/templateSertifkat';
import { useState, lazy } from 'react';
import Loader from '../Loader';
import TextInput from '../TextInput';
const Card = lazy(() => import('./Card'));
import ButtonCustom from '../ButtonCustom';
import CardListTemplateSkeleton from '../skeleton/CardListTemplateSkeleton';
import { Suspense } from 'react';

const CertificateModalList = () => {

    const [query, setQuery] = useState("");

    const {
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        refetch,
        remove,

    } = useInfiniteQuery(`listTemplateSertifikat`, {
        queryFn: async ({ pageParam }) => {
            const data = await getListTemplateSertifikat(pageParam || 0, query ? `?search=${query}` : '');
            return data.data;
        },
        getNextPageParam: (lastPage) => lastPage.data.data.lastId,

    });

    let searchTimeout;
    const search = (e) => {
        const query = e.target.value;
        setQuery(query);
        if (query.length > 3) {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            searchTimeout = setTimeout(() => {
                remove()
                refetch()
            }, 2000);
        } else {
            if (!query) {
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                }
                searchTimeout = setTimeout(() => {
                    remove()
                    refetch()
                }, 2000);
            }
        }
    };



    return (
        <div>
            <TextInput type={"text"} label={"Cari Template"} onChange={search} />

            {isLoading ? <CardListTemplateSkeleton /> : <>
                <div className='grid lg:grid-cols-3 grid-cols-2 gap-2'>
                    <Suspense fallback={<Loader />}>
                        {data.pages.map((dataTemplate) => (
                            dataTemplate.data.data.data.map((e, i) => (
                                <Card data={e} key={i} />
                            ))
                        ))}
                    </Suspense>
                </div>
                {hasNextPage && (
                    <div >
                        <ButtonCustom
                            text={
                                isFetchingNextPage || isLoading ? (
                                    <Loader />
                                ) : (
                                    "Load More"
                                )
                            }
                            onClick={
                                fetchNextPage
                            }
                            disabled={
                                isLoading
                            }

                        />

                    </div>
                )}
            </>}
        </div>
    )
}

export default WithContaierModal(CertificateModalList)