import { lazy, Suspense, useEffect } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import TextInput from "../../components/TextInput";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ButtonCustom from "../../components/ButtonCustom";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  createTemplate,
  deleteTemplate,
  editTemplate,
  getListTemplate,
  getTemplateById,
  searchTemplate,
} from "../../api/templateSurat";
import { Spinner } from "@material-tailwind/react";
const DataTemplateSurat = lazy(
  () => import("./TemplateSurat/DataTemplateSurat"),
);
const Form = lazy(() => import("./TemplateSurat/Form"));

import { useAlertNotification } from "../../store/store";
import ModalDelete from "../../components/ModalDelete";
import { useInView } from "react-intersection-observer";
import Preview from "./TemplateSurat/Preview";

export default function TemplateSurat() {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [currentIdTemplate, setCurrentIdTemplate] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { ref, inView } = useInView();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const handleOpenModalDelete = (currentId) => {
    setCurrentIdTemplate(currentId);
    setOpenModalDelete(!openModalDelete);
  };
  const handleOpenModalEdit = (currentId) => {
    setCurrentIdTemplate(currentId);
    setOpenModalEdit(!openModalDelete);
  };
  const handleOpen = () => {
    if (openModalEdit) {
      setOpenModalEdit(false);
      return;
    }
    setOpenCreateForm(!openCreateForm);
    setErrorMsg("");
  };

  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = useInfiniteQuery(`listTemplate`, {
    queryFn: async ({ pageParam }) => {
      const data = await getListTemplate(pageParam || 0);
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.lastIdTemplate,
    staleTime: 5000,
  });

  const TemplateById = useQuery(["template", currentIdTemplate], {
    queryFn: async () => {
      const data = await getTemplateById(currentIdTemplate);
      return data.data;
    },
    enabled: !!openPreview || !!openModalEdit,
  });

  const handleCreateTemplate = useMutation({
    mutationFn: async (e) => {
      const isCreate = await createTemplate(e);
      return isCreate.data;
    },
    onSuccess: (data) => {
      setOpenCreateForm(false);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
      refetch();
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });
  const handleEditTemplate = useMutation({
    mutationFn: async (e) => {
      const isCreate = await editTemplate({
        idTemplateSurat: currentIdTemplate,
        ...e,
      });
      return isCreate.data;
    },
    onSuccess: (data) => {
      setOpenModalEdit(false);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
      refetch();
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });

  const [isSearch, setIsSearch] = useState();

  const handleSearchTemplate = useMutation({
    mutationFn: async (jenisSurat) => {
      const dataSearch = await searchTemplate(jenisSurat);
      return dataSearch.data.data;
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
        handleSearchTemplate.mutate(query);
      }, 2000);
    } else {
      setIsSearch(false);
    }
  };

  const handleOpenPreview = (idTemplate) => {
    setCurrentIdTemplate(idTemplate);
    setOpenPreview(!openPreview);
  };





  const handleDeleteTemplateSurat = useMutation({
    mutationFn: async () => {
      const data = await deleteTemplate(currentIdTemplate);
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
      setStatus(true);
      setMsg(error.response.data.message);
    },
  });
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
      <Form
        open={openCreateForm || openModalEdit}
        handleOpen={handleOpen}
        title={"Buat Template Surat"}
        handleSubmit={openModalEdit ? handleEditTemplate : handleCreateTemplate}
        errorMsg={errorMsg}
        isEdit={openModalEdit}
        data={TemplateById.data}
      />
      <ModalDelete
        open={openModalDelete}
        handleOpen={handleOpenModalDelete}
        title="Delete Template"
        handleDelete={handleDeleteTemplateSurat}
      />
      <Preview title="Preview Template Surat" open={openPreview} handleOpen={()=>setOpenPreview(false)} size={"xl"} TemplateById={TemplateById}/>

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Data Template Surat
            </Typography>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={handleOpen}
              color="blue"
            >
              <FaPlusCircle className="h-4 w-4" /> Buat Template
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <TextInput
              label="Search"
              icon={
                handleSearchTemplate.isLoading ? (
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
          <DataTemplateSurat
            dataTemplateSurat={
              isSearch
                ? handleSearchTemplate.data
                  ? handleSearchTemplate.data
                  : []
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
  );
}
