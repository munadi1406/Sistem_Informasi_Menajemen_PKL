import { FaCertificate, FaChild, FaMailBulk, FaUser, FaUsers } from "react-icons/fa";
import CardStat from "../../../components/CardStat";
import { AiFillMail } from "react-icons/ai";
import { BiCertification, BiLogOut } from "react-icons/bi";
import { IoEnterOutline } from "react-icons/io5";
import Charts from "react-apexcharts";
import Loader from "../../../components/Loader";
import PropTypes from 'prop-types'

export default function Statistik({result}) {
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
        <CardStat
          icon={<BiCertification />}
          count={result[6]?.data}
          desc={"Template Sertifikat"}
          color={"bg-pink-400"}
        />
        <div className="lg:col-span-2  col-span-full">
          <CardStat
            icon={<FaCertificate />}
            count={result[5]?.data?.totalSertifikat}
            desc={"Sertifikat"}
            color={"bg-pink-400"}
          />
        </div>
        <div className="lg:col-span-3 sm:col-span-full  grid sm:grid-cols-2 grid-cols-1 w-full gap-2">
          <CardStat
            icon={<IoEnterOutline />}
            count={result[7]?.data}
            desc={" Surat Masuk"}
            color={"bg-teal-400"}
          />
          <CardStat
            icon={<BiLogOut />}
            count={result[8]?.data}
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
        <div className="bg-white rounded-lg shadow-sm col-span-2 flex flex-col gap-2 p-2 overflow-auto w-full">
          {result[9]?.isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="flex p-2 rounded-md bg-blue-600 justify-between text-white">
                Total Pengunjung
                <div>{result[9]?.data?.totalLog}</div>
              </div>
              <div className="flex p-2 rounded-md bg-red-300 justify-between text-white">
                Total Per Tahun
                <div>{result[9]?.data?.logsPerYear}</div>
              </div>
              <div className="flex p-2 rounded-md bg-yellow-400 justify-between text-white">
                Total Per Bulan
                <div>{result[9]?.data?.logsPerMonth}</div>
              </div>
              <div className="flex p-2 rounded-md bg-green-400 justify-between text-white">
                Total Pengunjung Hari Ini
                <div>{result[9]?.data?.logsPerDay}</div>
              </div>
            </>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm col-span-2 flex flex-col gap-2 p-2 overflow-auto w-full">
          {result[9]?.isLoading ? (
            <Loader />
          ) : (
            <>
            <Charts
              type="bar"
              options={{
                chart: {
                height: 350,
                type: 'bar',
                
              },
              plotOptions: {
                bar: {
                  columnWidth: '45%',
                  distributed: true,
                }
              },
              dataLabels: {
                enabled: false
              },
              legend: {
                show: false
              },
              xaxis: {
                categories: result[5]?.data?.byName.map(
                    (item) => item.nama,
                  ),
                labels: {
                  style: {
                    
                    fontSize: '12px'
                  }
                }
              
              }}
              }
              series={[
                {
                  data: result[5]?.data?.byName.map(
                    (item) => item.count,
                  ),
                },
              ]}
              height={350}
            />
            </>
          )}
        </div>
      </div>
    </>
  )
}


Statistik.propTypes={
    result:PropTypes.array
}
