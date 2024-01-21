import { lazy, Suspense, useTransition } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import { getListUsers, searchUsers } from "../../api/users";
import { useState } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
const FormChangePassword = lazy(()=>import( "./users/FormChangePassword"))
import Helmet from "../../utils/Helmet";
import ButtonCustom from "../../components/ButtonCustom";


const Evaluate = lazy(()=>import( "./users/Evaluate"));
const DataUsers = lazy(() => import("./users/DataUsers"));

export default function Users() {
  const [dataSearch, setDataSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState('users');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  const handleIsShowChangePassword = (id) => {

    setChangePassword(!changePassword);
    setCurrentId(id);
  };
  const { isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, data,refetch } =
    useInfiniteQuery(`listUsers`, {
      queryFn: async ({ pageParam }) => {
        const data = await getListUsers(pageParam || 0);
        return data.data;
      },
      getNextPageParam: (lastPage) => lastPage.data.lastIdUsers,
      staleTime: 5000,
    });
  const handleSearchUsers = useMutation({
    mutationFn: async (username) => {
      const dataSearch = await searchUsers(username);
      return dataSearch.data;
    },
    onSuccess: (data) => {
      setDataSearch(data.data);
    },
  });

  let searchTimeout;
  const search = (e) => {
    const query = e.target.value;
    if (query.length > 3) {
      setIsSearch(true);
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(() => {
        handleSearchUsers.mutate(query);
      }, 2000);
    } else {
      setIsSearch(false);
    }
  };

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <>
      <Helmet title={"Users"} />
      <FormChangePassword
        handleOpen={handleIsShowChangePassword}
        currentId={currentId}
        open={changePassword}
        title={"Ganti Password"} 
      />
      <div className="flex justify-center gap-2 items-center p-2 bg-white shadow-lg w-full rounded-md">
        <ButtonCustom text={"Users"} className={tab === 'users' ? 'bg-transparant text-blue-600' : ''} onClick={() => {selectTab("users")}} />
        <ButtonCustom text={"Evaluate"} className={tab === 'evaluate' ? 'bg-transparant text-blue-600' : ''} onClick={() => {selectTab("evaluate")}} />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        {tab === 'users' && (
          <DataUsers
            data={isSearch ? dataSearch : data.pages[0].data.data}
            fetchNextPage={fetchNextPage}
            hasNextPage={isSearch ? false : hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            search={search}
            isChangePassword={handleIsShowChangePassword}
            refetch={refetch}
          />
        )}
        {tab === 'evaluate' && (
          <Evaluate
            
          />
        )}
      </Suspense>
    </>
  );
}
