import { lazy, Suspense } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import { getListUsers, searchUsers } from "../../api/users";
import { useState } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import FormChangePassword from "./users/FormChangePassword";
const DataUsers = lazy(() => import("./users/DataUsers"));

export default function Users() {
  const [dataSearch, setDataSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const handleIsShowChangePassword = (id) => {
   
    setChangePassword(!changePassword);
    setCurrentId(id);
  };
  const { isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, data } =
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
      <FormChangePassword
        handleOpen={handleIsShowChangePassword}
        currentId={currentId}
        open={changePassword}
        title={"Ganti Password"}
      />
      <Suspense fallback={<TableSkeleton />}>
        <DataUsers
          data={isSearch ? dataSearch : data.pages[0].data.data}
          fetchNextPage={fetchNextPage}
          hasNextPage={isSearch ? false : hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          search={search}
          isChangePassword={handleIsShowChangePassword}
        />
      </Suspense>
    </>
  );
}
