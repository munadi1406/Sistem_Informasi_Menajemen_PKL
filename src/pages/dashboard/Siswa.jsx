import { lazy, Suspense } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
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
import DetailSiswa from "./siswa/DetailSiswa";
import ModalDeleteSiswa from "../../components/ModalDeleteSiswa";
import {
  deleteSiswa,
  detailSiswa,
  getListSiswa,
  searchSiswa,
} from "../../api/siswa";
const ExportFromXlsx = lazy(() => import("./siswa/ExportFromXlsx"));
const DataSiswa = lazy(() => import("./siswa/DataSiswa"));
import { BiImport } from "react-icons/bi";
import Avatars from "../../components/Avatars";

export default function Siswa() {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [isOpenDetailSiswa, setIsOpenDetailSiswa] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentNis, setCurrentNis] = useState(0);
  const [deleteConfirmData, setDeleteConfirmData] = useState({});
  const [openModalConfrimTTD, setOpenModalConfirmTTD] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalExport, setOpenModalExport] = useState(false);
  const [detailSiswaData, setDetailSiswaData] = useState({});

  const handleOpenModalExport = () => {
    setOpenModalExport(!openModalExport);
  };
  const handleOpenModalConfirmTTD = (idSurat) => {
    setOpenModalConfirmTTD(!openModalConfrimTTD);
    setCurrentNis(idSurat);
  };
  const handleOpenModalEdit = (currentId) => {
    setCurrentNis(currentId);
    setOpenModalEdit(!openModalEdit);
  };

  const handleOpenDetail = (data) => {
    setIsOpenDetailSiswa(!isOpenDetailSiswa);
    setDetailSiswaData(data);
  };
  const handleOpenModalDelete = (currentId, data) => {
    setDeleteConfirmData(data);
    setCurrentNis(currentId);
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
      const data = await getListSiswa(pageParam || 0, "");
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.data.lastNis,
    staleTime: 5000,
  });

  const handleGetDetailSiswa = useQuery(`detailSiswa-${currentNis}`, {
    queryFn: async () => {
      const datas = await detailSiswa(currentNis);
      return datas.data.data;
    },
    staleTime: 10000,
    enabled: !!isOpenDetailSiswa || !!openModalEdit,
  });

  const handleDeleteSiswa = useMutation({
    mutationFn: async () => {
      const data = await deleteSiswa(currentNis);
      return data.data;
    },
    onSuccess: (data) => {
      setOpenModalDelete(false);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
      refetch();
      handleSearchSiswa.refetch();
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
  const handleSearchSiswa = useInfiniteQuery(`siswaSearch-${query}`, {
    queryFn: async ({ pageParam }) => {
      const data = await searchSiswa(pageParam || 0, query);
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.data.lastNis,
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

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Form
        open={openCreateForm || openModalEdit}
        handleOpen={openModalEdit ? handleOpenModalEdit : handleOpenForm}
        title="Tambah Data Siswa"
        currentNis={currentNis}
        isEdit={openModalEdit}
        refetch={refetch}
        dataSiswa={handleGetDetailSiswa.data}
      />
      <ModalDeleteSiswa
        open={openModalDelete}
        handleOpen={handleOpenModalDelete}
        size="sm"
        data={deleteConfirmData}
        handleDelete={handleDeleteSiswa}
      />
      <DetailSiswa
        handleOpen={handleOpenDetail}
        open={isOpenDetailSiswa}
        title={"Detail Siswa"}
        data={detailSiswaData}
      />

      <ExportFromXlsx
        open={openModalExport}
        handleOpen={handleOpenModalExport}
        title={"Export Data Siswa"}
      />
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
                    <BiImport className="h-4 w-4" /> Import Dari Excel
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
                  handleSearchSiswa.isLoading ? (
                    <Spinner />
                  ) : (
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  )
                }
                onChange={search}
              />
            </div>
             <div>
              <div className="text-black text-lg font-semibold">Keterangan</div>
              <div className="flex gap-2 items-center">
               
                <div className="flex gap-2 justify-center items-center">
                  <Avatars/>
                  Jika Gambar Masih Seperti Itu Artinya Gambar Siswa/Siswi Belum Di Upload
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0">
          <Suspense fallback={<TableSkeleton />}>
            <DataSiswa
              dataSurat={
                isSearch
                  ? handleSearchSiswa.data
                    ? handleSearchSiswa.data.pages
                    : data.pages
                  : data.pages
              }
              handleOpenDetail={handleOpenDetail}
              handleOpenDelete={handleOpenModalDelete}
              handleOpenModalConfirmTTD={handleOpenModalConfirmTTD}
              handleOpenEdit={handleOpenModalEdit}
            />
          </Suspense>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          {hasNextPage && (
            <ButtonCustom
              text={
                isFetchingNextPage || handleSearchSiswa.isFetchingNextPage ? (
                  <Spinner />
                ) : (
                  "Load More"
                )
              }
              onClick={
                isSearch ? handleSearchSiswa.fetchNextPage : fetchNextPage
              }
              disabled={
                isSearch
                  ? handleSearchSiswa.isFetchingNextPage
                  : isFetchingNextPage
              }
            />
          )}
        </CardFooter>
      </Card>
    </>
  );
}
