import Charts from "react-apexcharts";
import { useQuery } from "react-query";
import { getSertifikatStat } from "../../api/sertifikat";
import Loader from "../Loader";
import TextInput from "../TextInput";
import ButtonCustom from "../ButtonCustom";
import { useState,useEffect } from "react";


const SertifikatStat = () => {
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

    const {isLoading,data,remove} = useQuery('sertifikatStat',{
        queryFn:async()=>{
            const datas= await getSertifikatStat(filterActive)
            return datas.data.data
        },
        staleTime:10000,

    })
    useEffect(() => {
      if (filter.startDate && filter.endDate) {
        remove()
        
        return
      }
    }, [filter]);
    const clearFilter = () => {
      setFilter({ startDate: null, endDate: null });
      remove()
      
    };


    if(isLoading){
        return <Loader/>
    }
  return (
    <div className="p-2 mt-2 space-y-4">
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
                  categories: data?.data.map(
                    (item) => item.nama,
                  ),
                },
                title: {
                  text: "Statistik Penerima Sertifikat",
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
                  data: data?.data.map(
                    (item) => item.jumlah,
                  ),
                },
              ]}
              height={350}
            />
    </div>
  )
}

export default SertifikatStat