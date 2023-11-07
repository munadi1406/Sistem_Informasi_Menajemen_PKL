import { lazy, Suspense } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  createSurat,
  deleteSurat,
  editSurat,
  getDetailSurat,
  getListSurats,
  searchSurat,
} from "../../api/surat";
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
import Form from "./siswa/Form";
import { useAlertNotification } from "../../store/store";
import PreviewSurat from "./Surat/PreviewSurat";
import ModalDeleteSurat from "../../components/ModalDeleteSurat";
import ModalConfirmTTD from "../../components/ModalConfirmTTD";
import { getListSiswa } from "../../api/siswa";
const  ExportFromXlsx = lazy(()=>import ("./siswa/ExportFromXlsx"));
const DataSiswa = lazy(() => import("./siswa/DataSiswa"));

export default function Siswa() {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentIdSurat, setCurrentIdSurat] = useState(0);
  const [deleteConfirmData, setDeleteConfirmData] = useState({});
  const [openModalConfrimTTD, setOpenModalConfirmTTD] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalExport,setOpenModalExport] = useState(false)
  const handleOpenModalExport = ()=> {
    setOpenModalExport(!openModalExport)
  }
  const handleOpenModalConfirmTTD = (idSurat) => {
    setOpenModalConfirmTTD(!openModalConfrimTTD);
    setCurrentIdSurat(idSurat);
  };
  const handleOpenModalEdit = (currentId) => {
    setCurrentIdSurat(currentId);
    setOpenModalEdit(!openModalEdit);
  };

  const handleOpenPreview = (idSurat) => {
    setIsOpenPreview(!isOpenPreview);
    if (!idSurat) return;
    setCurrentIdSurat(idSurat);
  };
  const handleOpenModalDelete = (currentId, data) => {
    setDeleteConfirmData(data);
    setCurrentIdSurat(currentId);
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
  } = useInfiniteQuery(`listSiswa`, {
    queryFn: async ({ pageParam }) => {
      const data = await getListSiswa(pageParam || 0);
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.data.lastNis,
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
      refetch();
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
      const datas = await getDetailSurat(currentIdSurat);
      return datas.data.data;
    },
    staleTime: 10000,
    enabled: !!isOpenPreview || !!openModalEdit,
  });

  const handleDeleteSurat = useMutation({
    mutationFn: async () => {
      const data = await deleteSurat(currentIdSurat);
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
  const [isSearch, setIsSearch] = useState();
  const [query, setQuery] = useState("");
  const handleSearchSurat = useInfiniteQuery(`listSearch-${query}`, {
    queryFn: async ({ pageParam }) => {
      const data = await searchSurat(pageParam || 0, query);
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.data.lastIdSurat,
    staleTime: 5000,
    enabled: !!isSearch,
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
        setQuery(query);
      }, 2000);
    } else {
      setIsSearch(false);
    }
  };

  const handleEditSurat = useMutation({
    mutationFn: async (e) => {
      const isCreate = await editSurat({
        idSurat: currentIdSurat,
        ...e,
      });
      return isCreate.data;
    },
    onSuccess: (data) => {
      // console.log(data)
      setOpenModalEdit(false);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError: (error) => {
      // setErrorMsg(error.response.data.message);
      console.log(error);
    },
  });
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Form
        open={openCreateForm || openModalEdit}
        handleOpen={openModalEdit ? handleOpenModalEdit : handleOpenForm}
        title="Tambah Data Siswa"
        handleSubmit={openModalEdit ? handleEditSurat : handleCreateSurat}
        isEdit={openModalEdit}
        dataSurat={handleGetDetailSurat.data}
      />
      <ModalDeleteSurat
        open={openModalDelete}
        handleOpen={handleOpenModalDelete}
        size="sm"
        data={deleteConfirmData}
        handleDelete={handleDeleteSurat}
      />
      <PreviewSurat
        handleOpen={handleOpenPreview}
        open={isOpenPreview}
        title={"Preview Surat"}
        handleGetDetailSurat={handleGetDetailSurat}
      />
      <ModalConfirmTTD
        open={openModalConfrimTTD}
        handleOpen={handleOpenModalConfirmTTD}
        size="lg"
        title="Konfirmasi Tanda Tangan"
        idSurat={currentIdSurat}
      />
      <ExportFromXlsx open={openModalExport} handleOpen={handleOpenModalExport} title={"Export Data Siswa"}/>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Data Siswa
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <ButtonCustom
                className="flex items-center gap-3"
                size="sm"
                text={
                  <>
                    <FaPlusCircle className="h-4 w-4" /> Tambah Data Siswa
                  </>
                }
                color="blue"
                onClick={handleOpenForm}
              />
              <ButtonCustom
                className="flex items-center gap-3"
                size="sm"
                text={
                  <>
                    <FaPlusCircle className="h-4 w-4" /> Export Dari Excel
                  </>
                }
                color="blue"
                onClick={handleOpenModalExport}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 w-full">
            <div className="w-full md:w-72">
              <TextInput
                label="Search"
                icon={
                  handleSearchSurat.isLoading ? (
                    <Spinner />
                  ) : (
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  )
                }
                onChange={search}
              />
            </div>
            
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0">
          <Suspense fallback={<TableSkeleton />}>
            <DataSiswa
              dataSurat={
                isSearch
                  ? handleSearchSurat.data
                    ? handleSearchSurat.data.pages
                    : data.pages
                  : data.pages
              }
              handleOpenPreview={handleOpenPreview}
              handleOpenDelete={handleOpenModalDelete}
              handleOpenModalConfirmTTD={handleOpenModalConfirmTTD}
              handleOpenEdit={handleOpenModalEdit}
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
