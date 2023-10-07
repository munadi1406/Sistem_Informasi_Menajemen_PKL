import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { FaPlusCircle, FaPencilAlt, FaTrash, FaEye } from 'react-icons/fa'
import { Dialog, DialogBody,DialogHeader } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import Form from "./TemplateSurat/Form";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

const TABLE_HEAD = ["Pembuat Template", "Jenis Template", "Di Buat", "Di Update", "Aksi"];

const tableData = [
    {
        username: "fathullah Munadi",
        jenisTemplate: "Surat Tugas",
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),

    },
    {
        username: "fathullah Munadi",
        jenisTemplate: "Surat Tugas",
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),

    },
    {
        username: "fathullah Munadi",
        jenisTemplate: "Surat Tugas",
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),

    },
]
export default function TemplateSurat() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <Card className="h-full w-full">
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
                        <Dialog open={open} handler={handleOpen} className="h-[90vh]">
                            <DialogHeader>Buat Template Surat</DialogHeader>
                            <DialogBody>
                                <Form />
                            </DialogBody>
                        </Dialog>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-auto px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(({ username, jenisTemplate, createdAt, updatedAt }, i) => {
                            const isLast = i === tableData.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={i}>
                                    <td className={classes}>

                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {username}
                                        </Typography>

                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {jenisTemplate}
                                        </Typography>

                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {createdAt}
                                        </Typography>

                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {updatedAt}
                                        </Typography>

                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Inactive Template Surat">
                                            <IconButton variant="text">
                                                <FaPencilAlt className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Lihat Template Surat">
                                            <IconButton variant="text">
                                                <FaEye className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Edit Template Surat">
                                            <IconButton variant="text">
                                                <FaTrash className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}