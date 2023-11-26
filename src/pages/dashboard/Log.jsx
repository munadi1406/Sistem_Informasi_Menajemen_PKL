import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { Suspense, lazy, useEffect } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import { getListLog, deleteAllLog } from "../../api/log";
import ButtonCustom from "../../components/ButtonCustom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import Loader from "../../components/Loader";
const DataLog = lazy(() => import("./log/DataLog"));
import { useInView } from "react-intersection-observer";
import { useAlertNotification, useDataUser } from "../../store/store";

export default function Log() {
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const { role } = useDataUser((state) => state);
  const { isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, data,refetch } =
    useInfiniteQuery(`listSiswa`, {
      queryFn: async ({ pageParam }) => {
        const data = await getListLog(pageParam || 0);
        return data.data;
      },
      getNextPageParam: (lastPage) => lastPage.data.data.lastId,
      staleTime: 5000,
    });
  const handleDeleteAllLog = useMutation({
    mutationFn: async () => {
      const datas = await deleteAllLog();
      return datas.data;
    },
    onSuccess: (data) => {
      refetch()
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError: (error) => {
      setOpen(true);
      setStatus(false);
      setMsg(error.response.data.message);
    },
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Data Log
            </Typography>
          </div>
          {role !==
            1 &&(
              <div>
                <ButtonCustom
                  text={
                    <div className="flex gap-2 justify-center items-center ">
                      Reset Log {handleDeleteAllLog.isLoading && <Loader />}
                    </div>
                  }
                  color={"red"}
                  disabled={handleDeleteAllLog.isLoading}
                  onClick={handleDeleteAllLog.mutate}
                />
              </div>,
            )}
        </div>
      </CardHeader>
      <CardBody className="overflow-auto px-0">
        <Suspense fallback={<TableSkeleton />}>
          <DataLog data={data.pages} />
        </Suspense>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        {hasNextPage && (
          <div ref={ref}>
            <ButtonCustom
              text={isFetchingNextPage ? <Spinner /> : "Load More"}
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
