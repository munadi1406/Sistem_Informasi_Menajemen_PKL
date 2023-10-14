import { lazy, Suspense } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import { Card, CardBody, CardFooter, CardHeader, DialogBody, DialogHeader, Typography, Button, Dialog } from "@material-tailwind/react";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import TextInput from "../../components/TextInput";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ButtonCustom from "../../components/ButtonCustom";
import { useInfiniteQuery, useQuery } from "react-query";
import { getListTemplate, getTemplateById } from "../../api/templateSurat";
import { Spinner } from "@material-tailwind/react";
const DataTemplateSurat = lazy(() => import("./TemplateSurat/DataTemplateSurat"));
const Form = lazy(() => import("./TemplateSurat/Form"));
import Index from '../../components/templateSuratLayout/Index'

export default function TemplateSurat() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [dataTemplate, setDataTemplate] = useState([])
    const [openPreview, setOpenPreview] = useState(false)
    const [currentIdTemplate, setCurrentIdTemplate] = useState(0)
    const handleOpenPreview = (idTemplate) => {
        setCurrentIdTemplate(idTemplate)
        setOpenPreview(!openPreview)
    }

    const { isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(`listTemplate`, {
            queryFn: async ({ pageParam }) => {
                const data = await getListTemplate(pageParam || 0);
                return data.data;
            },
            getNextPageParam: (lastPage) => lastPage.data.lastIdUsers,
            staleTime: 5000,
            onSuccess: (data) => {
                setDataTemplate(data.pages[0].data.templates)
            }
        });

    // const TemplateById = useQuery(`template${currentIdTemplate}`, {
    //     queryFn: async () => {
    //         const data = await getTemplateById(currentIdTemplate)
    //         return data.data
    //     },
    //     onSuccess: (data) => {
    //         console.log(data)
    //     }
    // })

    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <Card className="h-full w-full">
            <Dialog open={openPreview} handler={handleOpenPreview} className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>Preview</DialogHeader>
                <DialogBody >
                    <Index>
                        Testing
                    </Index>
                </DialogBody>
            </Dialog>
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Data Template Surat
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3" size="sm" onClick={handleOpen}>
                            <FaPlusCircle className="h-4 w-4" /> Buat Template
                        </Button>
                        <Dialog open={open} handler={handleOpen} className="max-h-[90vh] overflow-y-auto">
                            <DialogHeader>Buat Template Surat</DialogHeader>
                            <DialogBody >
                                <Suspense>
                                    <Form />
                                </Suspense>
                            </DialogBody>
                        </Dialog>
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
                    <DataTemplateSurat data={dataTemplate} handleOpenPreview={handleOpenPreview} />
                </Suspense>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <ButtonCustom className={`${hasNextPage !== true && 'hidden'}`} text={isFetchingNextPage ? <Spinner /> : 'Load More'} onClick={fetchNextPage} disabled={isFetchingNextPage} />
            </CardFooter>
        </Card>
    );
}