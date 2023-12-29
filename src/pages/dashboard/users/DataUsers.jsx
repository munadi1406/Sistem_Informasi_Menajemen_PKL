import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaPencilAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { changeAccountStatus, changeRole } from "../../../api/users";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Switch,
  Option,
  Select,
} from "@material-tailwind/react";
import ButtonCustom from "../../../components/ButtonCustom";
import { Spinner } from "@material-tailwind/react";
import TextInput from "../../../components/TextInput";

const TABLE_HEAD = [
  "User",
  "Role",
  "Status",
  "Created At",
  "Updated At",
  "",
];

const roles = ["Admin", "Kepala Sekolah", "Kepala Tas", "Pegawai"];

export default function DataUsers({
  data,
  isFetchingNextPage,
  search,
  hasNextPage,
  fetchNextPage,
  isChangePassword
}) {
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ id_users, status }) => {
      const change = await changeAccountStatus(id_users, status);
      return change;
    },
  });

  const handleChangeRole = useMutation({
    mutationFn: async ({ id_users, role }) => {
      const indexOfRole = roles.indexOf(role);
      const change = await changeRole(id_users, indexOfRole);
      return change;
    },
  });

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
          <div className="w-max">
            <TextInput
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={search}
              className="relative z-10"
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-auto px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(
              (
                {
                  id_users,
                  username,
                  email,
                  role,
                  status,
                  createdAt,
                  updatedAt,
                },
                index,
              ) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={username}>
                    <td className={classes}>
                      <div>
                        <h3 className="text-lg font-semibold">{username}</h3>
                        <h3 className="text-xs text-blue-400">{email}</h3>
                      </div>
                    </td>
                 
                    <td className={classes}>
                      <Select
                        label={"Role"}
                        onChange={(e) =>
                          handleChangeRole.mutate({ id_users, role: e })
                        }
                        value={roles[role]}
                        disabled={handleChangeRole.isLoading}
                        color="blue"
                      >
                        {roles.map((e, i) => (
                          <Option key={i} value={e}>
                            {e}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className={classes}>
                      <div className="w-max flex flex-col gap-2 justify-center items-center ">
                        <div
                          className={`text-xs font-semibold  py-1 px-4 rounded-full capitalize ${
                            status === "active"
                              ? "text-green-600"
                              : "text-red-300"
                          }`}
                        >
                          {status}
                        </div>
                        <Switch
                          key={index}
                          defaultChecked={status === "active" ? true : false}
                          color={"green"}
                          onChange={() => mutate({ id_users, status })}
                          disabled={isLoading}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(createdAt).toLocaleString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(updatedAt).toLocaleString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Ganti Password" >
                        <IconButton variant="text"  onClick={()=>isChangePassword(id_users)}>
                          <FaPencilAlt className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
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
  );
}
DataUsers.propTypes = {
  data: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  isFetchingNextPage: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  fetchNextPage: PropTypes.func.isRequired,
  isChangePassword:PropTypes.func.isRequired
};
