import CardStat from "../../components/CardStat";
import {
  FaUser,
  FaUsers,
  FaChild,
  FaMailBulk,
  FaCertificate,
} from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { AiFillMail } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useQuery } from "react-query";
import { countUsers, countThisWeek } from "../../api/users";
import { countTemplate } from "../../api/templateSurat";
import CardHomeSkeleton from "../../components/skeleton/CardHomeSkeleton";
import { countStudent } from "../../api/siswa";
import Charts from "react-apexcharts";
import { countSurat } from "../../api/surat";

export function Home() {
  const { data, isLoading } = useQuery("usersCount", {
    queryFn: async () => {
      const datas = await countUsers();
      return datas.data.data;
    },
  });

  const countTemplates = useQuery("templateCount", {
    queryFn: async () => {
      const datas = await countTemplate();
      return datas.data.data;
    },
  });

  const countUsersThisWeek = useQuery("usersThisWeek", {
    queryFn: async () => {
      const datas = await countThisWeek();
      return datas.data.data;
    },
  });

  const handleGetCountStudent = useQuery("studentCount", {
    queryFn: async () => {
      const datas = await countStudent();
      return datas.data.data;
    },
  });
  const handleGetCountSurat = useQuery("suratCount", {
    queryFn: async () => {
      const datas = await countSurat();
      return datas.data.data;
    },
  });

  if (isLoading) {
    return <CardHomeSkeleton />;
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <CardStat
          icon={<FaUser />}
          count={data}
          desc={" User"}
          color={"bg-blue-600"}
        />

        <CardStat
          icon={<FaUsers />}
          count={countUsersThisWeek?.data}
          desc={" User Yang Bergabung Minggu Ini "}
          color={"bg-green-400"}
        />
        <CardStat
          icon={<FaChild />}
          count={handleGetCountStudent?.data?.totalStudents}
          desc={" Siswa"}
          color={"bg-gray-600"}
        />
        <CardStat
          icon={<AiFillMail />}
          count={countTemplates.data}
          desc={" Template Surat"}
          color={"bg-red-400"}
        />
        <CardStat
          icon={<FaMailBulk />}
          count={handleGetCountSurat?.data?.totalSurats}
          desc={" Surat"}
          color={"bg-orange-400"}
        />
        <CardStat
          icon={<FaCertificate />}
          count={190}
          desc={" Sertifikat"}
          color={"bg-pink-400"}
        />
        <div className="col-span-3 grid grid-cols-2 w-full gap-2">
          <CardStat
            icon={<IoEnterOutline />}
            count={190}
            desc={" Surat Masuk"}
            color={"bg-teal-400"}
          />
          <CardStat
            icon={<BiLogOut />}
            count={190}
            desc={" Surat Keluar"}
            color={"bg-indigo-400"}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
        <div className="bg-white rounded-lg shadow-sm col-span-2 p-2 flex flex-col justify-center items-center ">
          {handleGetCountStudent.isSuccess && (
            <Charts
              type="pie"
              options={{
                chart: {
                  width: 380,
                  type: "pie",
                },
                labels: handleGetCountStudent?.data?.byGender.map(
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
              series={handleGetCountStudent?.data?.byGender.map(
                (student) => student.count,
              )}
              width={400}
            />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm lg:col-span-2 p-2 overflow-auto w-full">
          {handleGetCountSurat.isSuccess && (
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
                  categories: handleGetCountSurat?.data?.byJenisSurat.map(
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
                  data: handleGetCountSurat?.data?.byJenisSurat.map(
                    (item) => item.count,
                  ),
                },
              ]}
              height={350}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
