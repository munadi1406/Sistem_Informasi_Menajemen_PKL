import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
const TABLE_HEAD = [
  "Ip Address",
  "Username",
  "Sistem Operasi",
  "Browser",
  "URL",
  "Di Buat",
  "Di Update",
];
export default function DataLog({ data }) {
  return (
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
        {data.map(({ data }) =>
          data.data.data.map(
            (
              {
                ipAddress,
                osVersion,
                user,
                browserVersion,
                visitedURL,

                createdAt,
                updatedAt,
              },
              i,
            ) => {
              const isLast = i === data.length - 1;
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
                      {ipAddress}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.username}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {osVersion}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {browserVersion}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {visitedURL}
                    </Typography>
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
                </tr>
              );
            },
          ),
        )}
      </tbody>
    </table>
  );
}
DataLog.propTypes = {
  data: PropTypes.array,
};
