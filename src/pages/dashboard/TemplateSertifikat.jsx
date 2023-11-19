import { CardBody, CardFooter, Typography } from "@material-tailwind/react"
import { Card, CardHeader } from "@material-tailwind/react"
import { FaPlusCircle } from "react-icons/fa"
import ButtonCustom from '../../components/ButtonCustom'
import TextInput from '../../components/TextInput'
import { Suspense,lazy } from "react"
import { useAlertNotification } from "../../store/store"
import { useState } from "react"
import { useInfiniteQuery, useMutation, useQuery } from "react-query"
import TableSkeleton from "../../components/skeleton/TableSkeleton"
import { Spinner } from "@material-tailwind/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { deleteTemplateSertifikat, detailTemplateSertifikat, getListTemplateSertifikat, searchTemplateSertifikat } from "../../api/templateSertifkat"
import Form from "./templateSertifikat/Form"
import {useInView} from 'react-intersection-observer'
import ModalDeleteTemplateSertifikat from "../../components/ModalDeleteTemplateSertifikat"
import { useEffect } from "react"
import Preview from "./templateSertifikat/Preview"
const DataTemplateSertifikat = lazy(()=>import('./templateSertifikat/DataTemplateSertifikat'))

const TemplateSertifikat = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [deleteConfirmData, setDeleteConfirmData] = useState({});
  const [openModalConfrimTTD, setOpenModalConfirmTTD] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const {ref,inView} = useInView()
  
  const handleOpenModalConfirmTTD = (idSurat) => {
    setOpenModalConfirmTTD(!openModalConfrimTTD);
    setCurrentId(idSurat);
  };
  const handleOpenModalEdit = (currentId) => {
    setCurrentId(currentId);
    setOpenModalEdit(!openModalEdit);
  };

  const handleOpenPreview = (id) => {
    console.log("running");
    setIsOpenPreview(!isOpenPreview);
    setCurrentId(id)
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
  } = useInfiniteQuery(`listTemplateSertifikat`, {
    queryFn: async ({ pageParam }) => {
      const data = await getListTemplateSertifikat(pageParam || 0, "");
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.data.lastId,
    staleTime: 5000,
  });

  const handleGetDetailTemplate = useQuery(`detailTemplateSertifkat-${currentId}`, {
    queryFn: async () => {
      const datas = await detailTemplateSertifikat(currentId);
      return datas.data.data;
    },
    staleTime: 10000,
    enabled: !!isOpenPreview || !!openModalEdit,
  });

  const handleDeleteSertifikat = useMutation({
    mutationFn: async () => {
      const data = await deleteTemplateSertifikat(currentId);
      return data.data;
    },
    onSuccess: (data) => {
      setOpenModalDelete(false);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
      refetch();
      handleSearchTemplateSertifikat.refetch();
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
  const handleSearchTemplateSertifikat = useInfiniteQuery(`siswaSearch-${query}`, {
    queryFn: async ({ pageParam }) => {
      const data = await searchTemplateSertifikat(pageParam || 0, query);
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

  useEffect(()=>{
    if(inView){
      console.log(inView)
      fetchNextPage()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[inView])

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <div>
    
    <Form
        open={openCreateForm || openModalEdit}
        handleOpen={openModalEdit ? handleOpenModalEdit : handleOpenForm}
        title="Buat Template"
        currentId={currentId}
        isEdit={openModalEdit}
        refetch={refetch}
        dataTemplate={handleGetDetailTemplate.data}
      />
       <ModalDeleteTemplateSertifikat
        open={openModalDelete}
        handleOpen={handleOpenModalDelete}
        size="sm"
        data={deleteConfirmData}
        handleDelete={handleDeleteSertifikat}
      />
      <Preview open={isOpenPreview} title={"Preview Template Sertifikat"} handleOpen={handleOpenPreview} data={handleGetDetailTemplate.data}/>
       <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Template Sertifikat
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <ButtonCustom
                className="flex items-center gap-3"
                size="sm"
                text={
                  <>
                    <FaPlusCircle className="h-4 w-4" /> Buat Template
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
                  handleSearchTemplateSertifikat.isLoading ? (
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
        <CardBody className="overflow-auto px-0 min-h-screen">
          <Suspense fallback={<TableSkeleton />}>
            <DataTemplateSertifikat
              dataTemplate={
                isSearch
                  ? handleSearchTemplateSertifikat.data
                    ? handleSearchTemplateSertifikat.data.pages
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
            <div ref={ref}>
            <ButtonCustom
              text={
                isFetchingNextPage || handleSearchTemplateSertifikat.isFetchingNextPage ? (
                  <Spinner />
                ) : (
                  "Load More"
                )
              }
              
              onClick={
                isSearch ? handleSearchTemplateSertifikat.fetchNextPage : fetchNextPage
              }
              disabled={
                isSearch
                  ? handleSearchTemplateSertifikat.isFetchingNextPage
                  : isFetchingNextPage
              }
              
            />

            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default TemplateSertifikat