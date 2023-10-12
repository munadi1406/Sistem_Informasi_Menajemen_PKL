import { lazy, Suspense } from 'react'
import {useInfiniteQuery} from 'react-query';
import { getListUsers } from '../../api/users';
const DataUsers = lazy(() => import('./users/DataUsers'))


export default function Users() {
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(`listUsers`, {
      queryFn: async ({ pageParam }) => {
        const data = await getListUsers(pageParam || 0);
        return data.data;
      },
      getNextPageParam: (lastPage) => lastPage.data.lastIdUsers,
      staleTime: 5000,
    });



    if(isLoading){
        return <>Loading...testing</>
    }


    return (
        <>
            <Suspense>
                <DataUsers data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}/>
            </Suspense>
        </>
    )
}