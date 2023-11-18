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
import { BiLogOut, BiCertification } from "react-icons/bi";
import { useQuery } from "react-query";
import { countUsers, countThisWeek } from "../../api/users";
import { countTemplate } from "../../api/templateSurat";
import CardHomeSkeleton from "../../components/skeleton/CardHomeSkeleton";
import { countStudent } from "../../api/siswa";
import Charts from "react-apexcharts";
import {
  countSurat,
  getSuratKeluarStat,
  getSuratMasukStat,
} from "../../api/surat";
import { getLogStat } from "../../api/log";
import Loader from "../../components/Loader";

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
  const handleGetSuratMasukStat = useQuery("suratIn", {
    queryFn: async () => {
      const datas = await getSuratMasukStat();
      return datas.data.data;
    },
  });
  const handleGetSuratKeluarStat = useQuery("suratOut", {
    queryFn: async () => {
      const datas = await getSuratKeluarStat();
      return datas.data.data;
    },
  });
  const handleGetSertifkatStat = useQuery("sertifikat", {
    queryFn: async () => {
      const datas = await getSuratKeluarStat();
      return datas.data.data;
    },
  });
  const handleGetTemplateSertifikat = useQuery("template-sertifikat", {
    queryFn: async () => {
      const datas = await getSuratKeluarStat();
      return datas.data.data;
    },
  });

  const handleGetLogStat = useQuery("logStat", {
    queryFn: async () => {
      const datas = await getLogStat();
      return datas.data.data;
    },
  });

  if (isLoading) {
    return <CardHomeSkeleton />;
  }
  return (
    <>
      <div className="grid h-full grid-cols-3 w-full gap-2">
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
          count={handleGetSertifkatStat?.data}
          desc={"Sertifikat"}
          color={"bg-pink-400"}
        />
        <div className="lg:col-span-full">
          <CardStat
            icon={<BiCertification />}
            count={handleGetTemplateSertifikat.data}
            desc={"Template Sertifikat"}
            color={"bg-pink-400"}
          />
        </div>
        <div className="col-span-3 grid lg:grid-cols-2 grid-cols-1 w-full gap-2">
          <CardStat
            icon={<IoEnterOutline />}
            count={handleGetSuratMasukStat?.data}
            desc={" Surat Masuk"}
            color={"bg-teal-400"}
          />
          <CardStat
            icon={<BiLogOut />}
            count={handleGetSuratKeluarStat?.data}
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

        <div className="bg-white rounded-lg shadow-sm col-span-2 p-2 overflow-auto w-full">
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
        <div className="bg-white rounded-lg shadow-sm col-span-2 flex flex-col gap-2 p-2 overflow-auto w-full">
          {handleGetLogStat.isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="flex p-2 rounded-md bg-blue-600 justify-between text-white">
                Total Pengunjung
                <div>{handleGetLogStat.data.totalLog}</div>
              </div>
              <div className="flex p-2 rounded-md bg-red-300 justify-between text-white">
                Total Per Tahun
                <div>{handleGetLogStat.data.logsPerYear}</div>
              </div>
              <div className="flex p-2 rounded-md bg-yellow-400 justify-between text-white">
                Total Per Bulan
                <div>{handleGetLogStat.data.logsPerMonth}</div>
              </div>
              <div className="flex p-2 rounded-md bg-green-400 justify-between text-white">
                Total Pengunjung Hari Ini
                <div>{handleGetLogStat.data.logsPerDay}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
