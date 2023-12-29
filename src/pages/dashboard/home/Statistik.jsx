import { FaChild, FaMailBulk, FaUser, FaUsers } from "react-icons/fa";
import { lazy } from 'react'
const CardStat = lazy(() => import("../../../components/CardStat"));
import { AiFillMail } from "react-icons/ai";
import { BiCertification, BiLogOut } from "react-icons/bi";
import { IoEnterOutline } from "react-icons/io5";
import Charts from "react-apexcharts";
import PropTypes from 'prop-types'
const VisitorLog =lazy(()=>import( "../../../components/VisitorLog"));

export default function Statistik({ result }) {
  return (
    <>
      <div className="grid h-full lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-2">
        <CardStat
          icon={<FaUser />}
          count={result[0]?.data}
          desc={" User"}
          color={"bg-blue-600"}
        />
        <CardStat
          icon={<FaUsers />}
          count={result[1]?.data}
          desc={" User Yang Bergabung Minggu Ini "}
          color={"bg-green-400"}
        />
        <CardStat
          icon={<FaChild />}
          count={result[2]?.data?.totalStudents}
          desc={" Siswa"}
          color={"bg-gray-600"}
        />
        <div className="lg:col-span-2 col-span-1">
          <CardStat
            icon={<AiFillMail />}
            count={result[3]?.data}
            desc={" Template Surat"}
            color={"bg-red-400"}
          />
        </div>
        <CardStat
          icon={<FaMailBulk />}
          count={result[4]?.data?.totalSurats}
          desc={" Surat"}
          color={"bg-orange-400"}
        />
        <div className={"lg:col-span-full"}>
          <CardStat
            icon={<BiCertification />}
            count={result[5]?.data}
            desc={"Template Sertifikat"}
            color={"bg-pink-400"}

          />
        </div>
        <div className="lg:col-span-3 sm:col-span-full  grid sm:grid-cols-2 grid-cols-1 w-full gap-2">
          <CardStat
            icon={<IoEnterOutline />}
            count={result[6]?.data}
            desc={" Surat Masuk"}
            color={"bg-teal-400"}
          />
          <CardStat
            icon={<BiLogOut />}
            count={result[7]?.data}
            desc={" Surat Keluar"}
            color={"bg-indigo-400"}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
        <div className="bg-white rounded-lg shadow-sm col-span-2 p-2 flex flex-col justify-center items-center ">
          {result[2]?.isSuccess && (
            <Charts
              type="pie"
              options={{
                chart: {
                  width: 380,
                  type: "pie",
                },
                labels: result[2]?.data?.byGender.map(
                  (student) => student.jenis_kelamin,
                ),
                title: {
                  text: "Statistik Jenis Kelamin",
                  align: "center",
                  floating: false,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }}
              series={result[2]?.data?.byGender.map(
                (student) => student.count,
              )}
              width={400}
            />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm col-span-2 p-2 overflow-auto w-full">
          {result[4]?.isSuccess && (
            <Charts
              type="bar"
              options={{
                chart: {
                  type: "bar",
                  height: 350,
                },
                plotOptions: {
                  bar: {
                    barHeight: "100%",
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                      position: "bottom",
                    },
                  },
                },
                colors: [
                  "#33b2df",
                  "#546E7A",
                  "#d4526e",
                  "#13d8aa",
                  "#A5978B",
                  "#2b908f",
                  "#f9a3a4",
                  "#90ee7e",
                  "#f48024",
                  "#69d2e7",
                ],
                dataLabels: {
                  enabled: true,
                },

                xaxis: {
                  categories: result[4]?.data?.byJenisSurat.map(
                    (item) => item.jenis_surat,
                  ),
                },
                title: {
                  text: "Statistik Jenis Surat",
                  align: "center",
                  floating: false,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }}
              series={[
                {
                  data: result[4]?.data?.byJenisSurat.map(
                    (item) => item.count,
                  ),
                },
              ]}
              height={350}
            />
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm col-span-full flex flex-col gap-2 p-2 overflow-auto w-full">
          <VisitorLog />
        </div>

      </div>
    </>
  )
}


Statistik.propTypes = {
  result: PropTypes.array
}
