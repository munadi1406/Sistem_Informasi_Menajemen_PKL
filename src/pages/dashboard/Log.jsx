import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { Suspense, lazy, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { getListLog } from "../../api/log";
import ButtonCustom from "../../components/ButtonCustom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
const DataLog = lazy(() => import("./log/DataLog"));
import { useInView } from "react-intersection-observer";

export default function Log() {
  const { isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery(`listSiswa`, {
      queryFn: async ({ pageParam }) => {
        const data = await getListLog(pageParam || 0);
        return data.data;
      },
      getNextPageParam: (lastPage) => lastPage.data.data.lastId,
      staleTime: 5000,
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
