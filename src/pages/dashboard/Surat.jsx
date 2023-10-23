import { lazy, Suspense } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { createSurat, getDetailSurat, getListSurats } from "../../api/surat";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import TextInput from "../../components/TextInput";
import ButtonCustom from "../../components/ButtonCustom";
import { FaPlusCircle } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import Form from "./Surat/Form";
import { useAlertNotification } from "../../store/store";
import PreviewSurat from "./Surat/PreviewSurat";
const DataSurat = lazy(() => import("./Surat/DataSurat"));

export default function Surat() {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [currentIdSurat, setCurrentIdSurat] = useState(0);
  const handleOpenPreview = (idSurat) => {
    setIsOpenPreview(!isOpenPreview);
    if (!idSurat) return;
    setCurrentIdSurat(idSurat);
  };
  const handleOpenForm = () => setOpenCreateForm(!openCreateForm);
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const { isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery(`listSurat`, {
      queryFn: async ({ pageParam }) => {
        const data = await getListSurats(pageParam || 0);
        return data.data;
      },
      getNextPageParam: (lastPage) => lastPage.data.lastIdSurat,
      staleTime: 5000,
    });

  const handleCreateSurat = useMutation({
    mutationFn: async (payload) => {
      const datas = await createSurat(payload);
      return datas.data;
    },
    onSuccess: (data) => {
      setOpenCreateForm(false);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError: (error) => {
      setOpenCreateForm(false);
      setOpen(true);
      setStatus(true);
      setMsg(error.response.data.message);
    },
  });

  const handleGetDetailSurat = useQuery(`detailSurat-${currentIdSurat}`, {
    queryFn: async () => {
      const datas= await getDetailSurat(currentIdSurat);
      return datas.data.data;
    },
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Form
        open={openCreateForm}
        handleOpen={handleOpenForm}
        title="Buat Surat"
        handleSubmit={handleCreateSurat}
      />
      <PreviewSurat
        handleOpen={handleOpenPreview}
        open={isOpenPreview}
        title={"Preview Surat"}
        handleGetDetailSurat={handleGetDetailSurat}
      />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Data Surat
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <ButtonCustom
                className="flex items-center gap-3"
                size="sm"
                text={
                  <>
                    <FaPlusCircle className="h-4 w-4" /> Buat Surat
                  </>
                }
                color="blue"
                onClick={handleOpenForm}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <TextInput
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0">
          <Suspense fallback={<TableSkeleton />}>
            <DataSurat
              data={data.pages[0].data.data}
              handleOpenPreview={handleOpenPreview}
            />
          </Suspense>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          {hasNextPage && (
            <ButtonCustom
              text={isFetchingNextPage ? <Spinner /> : "Load More"}
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
            />
          )}
        </CardFooter>
      </Card>
    </>
  );
}
