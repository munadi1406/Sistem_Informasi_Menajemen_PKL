import Charts from "react-apexcharts";
import { useQuery } from "react-query";
import { getSertifikatStat } from "../../api/sertifikat";
import Loader from "../Loader";


const SertifikatStat = () => {
    const {isLoading,data} = useQuery('sertifikatStat',{
        queryFn:async()=>{
            const datas= await getSertifikatStat('')
            return datas.data.data
        }
    })


    if(isLoading){
        return <Loader/>
    }
  return (
    <div>
        
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