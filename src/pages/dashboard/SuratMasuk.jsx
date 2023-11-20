import { lazy, Suspense } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  deleteSuratMasuk,
  detailSuratMasuk,
  getListSuratMasuk,
} from "../../api/suratMasuk";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import TextInput from "../../components/TextInput";
import ButtonCustom from "../../components/ButtonCustom";
import { FaPlusCircle, FaPrint } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import Form from "./suratMasuk/Form";
import { useAlertNotification } from "../../store/store";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
const Print = lazy(() => import("./suratMasuk/Print"));
const ModalDeleteSuratMasuk = lazy(
  () => import("../../components/ModalDeleteSuratMasuk"),
);
const DetailSuratMasuk = lazy(() => import("./suratMasuk/DetailSuratMasuk"));
const DataSuratMasuk = lazy(() => import("./suratMasuk/DataSuratMasuk"));

export default function SuratMasuk() {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [deleteConfirmData, setDeleteConfirmData] = useState({});
  const [isSearch, setIsSearch] = useState();
  const [query, setQuery] = useState("");
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState({});
  const [isFilter, setIsFilter] = useState(false);
const [isPrint, setIsPrint] = useState(false);

  const handleIsPrint = () => {
    setFilter({startDate:null,endDate:null})
    setIsPrint(!isPrint)
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenModalEdit = (currentId) => {
    setCurrentId(currentId);
    setOpenModalEdit(!openModalEdit);
  };

  const handleOpenPreview = (idSurat) => {
    setIsOpenPreview(!isOpenPreview);
    if (!idSurat) return;
    setCurrentId(idSurat);
  };
  const handleOpenModalDelete = (currentId, data) => {
    setDeleteConfirmData(data);
    setCurrentId(currentId);
    setOpenModalDelete(!openModalDelete);
  };
  const handleOpenForm = () => setOpenCreateForm(!openCreateForm);
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = useInfiniteQuery(`listSuratMasuk`, {
    queryFn: async ({ pageParam }) => {
      const data = await getListSuratMasuk(pageParam || 0, ``);
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.data.lastId,
    staleTime: 10000,
  });

  const handleGetDetailSuratMasuk = useQuery(`detailSuratMasuk-${currentId}`, {
    queryFn: async () => {
      const datas = await detailSuratMasuk(currentId);
      return datas.data.data;
    },
    staleTime: 10000,
    enabled: !!isOpenPreview || !!openModalEdit,
  });

  const handleDeleteSurat = useMutation({
    mutationFn: async () => {
      const data = await deleteSuratMasuk(currentId);
      return data.data;
    },
    onSuccess: (data) => {
      setOpenModalDelete(false);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
      refetch();
    },
    onError: (error) => {
      setOpenModalDelete(false);
      setOpen(true);
      setStatus(false);
      setMsg(error.response.data.message);
    },
  });

  const handleSearchSuratMasuk = useInfiniteQuery(
    `listSearchSuratMasuk-${query}-${filter.startDate}-${filter.endDate}`,
    {
      queryFn: async ({ pageParam }) => {
        const data = await getListSuratMasuk(
          pageParam || 0,
          `${
            isSearch
              ? `?search=${query}${
                  isFilter
                    ? `&startDate=${filter.startDate}&endDate=${filter.endDate}`
                    : ""
                }`
              : `${
                  isFilter
                    ? `?startDate=${filter.startDate}&endDate=${filter.endDate}`
                    : ""
                }`
          }`,
        );
        return data.data;
      },
      getNextPageParam: (lastPage) => lastPage.data.data.lastId,
      staleTime: 5000,
      enabled: !!isSearch || !!isFilter,
    },
  );

  let searchTimeout;
  const search = (e) => {
    const query = e.target.value;
    if (query.length > 3) {
      setIsSearch(true);
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(() => {
        setQuery(query);
      }, 2000);
    } else {
      setIsSearch(false);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (filter.startDate && filter.endDate) {
      setIsFilter(true);
      return;
    }
    setIsFilter(false);
  }, [filter]);

  const clearFilter = () => {
    setIsFilter(false);
    setIsSearch(false);
    setFilter({ startDate: null, endDate: null });
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Form
        open={openCreateForm || openModalEdit}
        handleOpen={openModalEdit ? handleOpenModalEdit : handleOpenForm}
        title={openModalEdit ? "Edit Surat Masuk" : "Tambah Surat Masuk"}
        refetch={refetch}
        isEdit={openModalEdit}
        dataSuratMasuk={handleGetDetailSuratMasuk.data}
        currentId={currentId}
      />
      <ModalDeleteSuratMasuk
        open={openModalDelete}
        handleOpen={handleOpenModalDelete}
        size="sm"
        data={deleteConfirmData}
        handleDelete={handleDeleteSurat}
      />
      <DetailSuratMasuk
        handleOpen={handleOpenPreview}
        open={isOpenPreview}
        title={"Detail Surat Masuk"}
        handleGetDetailSuratMasuk={handleGetDetailSuratMasuk}
      />
      <Print
        open={isPrint}
        handleOpen={handleIsPrint}
        title={"Print Data Surat Masuk"}
        handleChange={handleChange}
        data={handleSearchSuratMasuk}
        initialData={filter}
        clearFilter={clearFilter}
      />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Data Surat Masuk
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <ButtonCustom
                className="flex items-center gap-3"
                size="sm"
                text={
                  <>
                    <FaPrint className="h-4 w-4" /> Cetak
                  </>
                }
                color="green"
                onClick={handleIsPrint}
              />
              <ButtonCustom
                className="flex items-center gap-3"
                size="sm"
                text={
                  <>
                    <FaPlusCircle className="h-4 w-4" /> Tambah Surat Masuk
                  </>
                }
                color="blue"
                onClick={handleOpenForm}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 w-full">
            <div className="w-full md:w-72">
              <TextInput
                label="Search"
                icon={
                  handleSearchSuratMasuk.isLoading ? (
                    <Spinner />
                  ) : (
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  )
                }
                onChange={search}
              />
            </div>
            <div className="w-full md:w-72 space-y-3">
              <p className="text-blue-600 font-semibold text-xs">
                Filter Berdasarkan Tanggal Masuk
              </p>
              <div className="flex gap-2">
                <TextInput
                  type={"date"}
                  label={"Dari Tanggal"}
                  name="startDate"
                  onChange={handleChange}
                  value={filter.startDate || ""}
                />
                <TextInput
                  type={"date"}
                  label={"Sampai Tanggal"}
                  name="endDate"
                  onChange={handleChange}
                  value={filter.endDate || ""}
                />
                <ButtonCustom text={"Clear"} onClick={clearFilter} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0 min-h-screen">
          <Suspense fallback={<TableSkeleton />}>
            <DataSuratMasuk
              dataSurat={
                isSearch || isFilter
                  ? handleSearchSuratMasuk.data
                    ? handleSearchSuratMasuk.data.pages
                    : data.pages
                  : data.pages
              }
              handleOpenPreview={handleOpenPreview}
              handleOpenDelete={handleOpenModalDelete}
              handleOpenEdit={handleOpenModalEdit}
            />
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
    </>
  );
}
