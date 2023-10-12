import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, CardBody, CardFooter, Input, Tab, Tabs, TabsHeader, Card, CardHeader, Typography, Option } from "@material-tailwind/react";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import PropTypes from 'prop-types'
import DataTable from 'react-data-table-component'
import { Tooltip } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import { useMutation } from "react-query";
import { changeAccountStatus } from "../../../api/users";
import { Select } from "@material-tailwind/react";


const roles = ['Admin', 'Kepala Sekolah', 'Kepala Tas', 'Pegawai'];




export default function Data({ data, isFetchingNextPage, hasNextPage, fetchNextPage }) {


    const { mutate } = useMutation({
        mutationFn: async (idUsers, status) => {
            const change = changeAccountStatus(idUsers, status)
            return change
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [datas, setDatas] = useState(data.pages[0].data.data);
    const TABS = [
        {
            label: "Active",
            value: "monitored",
        },
        {
            label: "Inactive",
            value: "unmonitored",
        },
    ];

    const column = [
        {
            name: 'Username',
            selector: row => row.username,
        },
        {
            name: "email",
            selector: row => row.email
        },
        {
            name: "role",
            selector: row => (
                <Select label={`${roles[row.role]}`} onChange={(e) => console.log(e)}>
                    {roles.map((e, i) => (
                        <Option key={i} value={i}>{e}</Option>
                    ))}
                </Select>
            )
        },
        {
            name: "status",
            selector: row => <Switch color="green" defaultChecked={row.status === "active" ? true : false} onChange={() => mutate(row.id_users, row.status)} />
        },
        {
            name: "created At",
            selector: row => new Date(row.createdAt).toLocaleString()
        },
        {
            name: "updated At",
            selector: row => new Date(row.updatedAt).toLocaleString()
        },
        {
            name: "Aksi",
            selector: () => <Tooltip content="Inactive Template Surat">
                <IconButton variant="text">
                    <FaPencilAlt className="h-4 w-4" />
                </IconButton>
            </Tooltip>
        },
    ]
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Data Users
                        </Typography>
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

                <DataTable data={datas} columns={column} />
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" onClick={fetchNextPage} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
