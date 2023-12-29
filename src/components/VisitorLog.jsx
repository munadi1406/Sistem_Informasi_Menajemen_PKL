import { useQuery } from 'react-query'
import { getLogStat } from '../api/log'
import Loader from './Loader'
import CardStatistik from './statistik/CardStatistik'

const VisitorLog = () => {
    const { data, isLoading } = useQuery('visitorLog', async () => {
        const datas = await getLogStat()
        return datas.data.data
    })
    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="grid lg:grid-cols-4  grid-cols-2 gap-2">
            <CardStatistik bgColor={"bg-blue-400"} textColor={"text-blue-300"} title={"Total Pengunjung"} count={data?.totalLog} />
            <CardStatistik bgColor={"bg-red-400"} textColor={"text-blue-300"} title={" Total Per Tahun"} count={data?.logsPerYear} />
            <CardStatistik bgColor={"bg-green-400"} textColor={"text-blue-300"} title={" Total Per Bulan"} count={data?.logsPerMonth} />
            <CardStatistik bgColor={"bg-gray-400"} textColor={"text-blue-300"} title={"  Total Pengunjung Hari Ini"} count={data?.logsPerDay} />
        </div>
    )
}

export default VisitorLog