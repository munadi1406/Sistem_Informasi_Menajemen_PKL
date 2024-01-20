import { Typography } from '@material-tailwind/react'
import Charts from 'react-apexcharts'
import { useQuery } from 'react-query'
import { evaluateUsers } from '../../../api/users'
import { lazy, Suspense } from 'react'
const Card = lazy(() => import('../../../components/Card'))
import Loader from '../../../components/Loader'
import TextInput from '../../../components/TextInput'
import ButtonCustom from '../../../components/ButtonCustom'
import { useState, useEffect } from 'react'


const Evaluate = () => {
  const [filter, setFilter] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const filterActive = filter?.startDate && filter?.endDate ? `?startDate=${filter.startDate}&endDate=${filter.endDate}` : ''

  const { data, isLoading,  remove } = useQuery('statEvaluate', {
    queryFn: async () => {
      const datas = await evaluateUsers(filterActive)
      return datas.data
    },
    staleTime: 10000,
    refetchInterval: 10000,
  })
  useEffect(() => {
    if (filter.startDate && filter.endDate) {
      remove()
      return
    }
  }, [filter]);
  const style = {
    header: "cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
  }
  const clearFilter = () => {
    setFilter({ startDate: null, endDate: null });
    remove()
    
  };


  if (isLoading) {
    return <Loader />
  }
  const state = {
    series: [{
      name: 'Jumlah Surat',
      data: data.data.map((e) => e.countSurat)
    }, {
      name: 'Jumlah Sertifikat',
      data: data.data.map((e) => e.countSertifikat)
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }

      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      title: {
        text: "Statistik Kinerja Users",
        align: "center",
        floating: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      
      xaxis: {
        categories: data.data.map(({ username }) => username),
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },
  };
  return (
    <Suspense fallback={<Loader />}>
      <Card header={
        <div className="mb-8 flex items-start justify-between flex-col gap-2">
          <div>
            <Typography variant="h5" color="blue-gray">
              Kinerja Users
            </Typography>
          </div>
          <div className="w-full  space-y-3">
            <div className="grid lg:grid-cols-3 grid-cols-1 w-full  gap-2">
              <TextInput
                type={"date"}
                label={"Dari Tanggal"}
                name="startDate"
                onChange={handleChange}
                value={filter.startDate || ""}
              />
              <TextInput
                type={"date"}
                label={"Sampai Tanggal"}
                name="endDate"
                onChange={handleChange}
                value={filter.endDate || ""}
              />
              <div>
                <ButtonCustom text={"Clear"} onClick={clearFilter} />
              </div>
            </div>
          </div>
        </div>}
        body={<table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className={`${style.header}`}>Username</th>
              <th className={`${style.header}`}>Jumlah Surat Dibuat</th>
              <th className={`${style.header}`}>Jumlah Sertifikat DiBuat </th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((e, i) => {
              const isLast = i === e.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={i}>
                  <td className={classes}>{e.username}</td>
                  <td className={classes}>{e.countSurat}</td>
                  <td className={classes}>{e.countSertifikat}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>}
      />

      <Card header={
        <div className="mb-8 flex items-center justify-between gap-8">
         
          <div>
            <Typography variant="h5" color="blue-gray">
              Kinerja Users
            </Typography>
          </div>
        </div>
      }
        body={
          <div>
            <div id="chart">
              <Charts options={state.options} series={state.series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
          </div>
        } />
    </Suspense>
  )
}

export default Evaluate