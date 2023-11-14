import CardStat from "../../components/CardStat";
import { FaUser,FaUsers,FaChild,FaMailBulk,FaCertificate } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { AiFillMail } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useQuery } from "react-query";
import { countUsers,countThisWeek } from "../../api/users";
import { countTemplate } from "../../api/templateSurat";
import CardHomeSkeleton from "../../components/skeleton/CardHomeSkeleton";

export function Home() {
  const {data,isLoading} = useQuery('usersCount',{
    queryFn:async()=>{
      const datas = await countUsers()
      return datas.data.data
  }}
  )

  const countTemplates = useQuery('templateCount',{
    queryFn:async()=>{
      const datas = await countTemplate()
      return datas.data.data
  }}
  )

  const countUsersThisWeek = useQuery('usersThisWeek',{
    queryFn:async()=>{
      const datas = await countThisWeek()
      return datas.data.data
  }}
  )
  
  if(isLoading){
    return <CardHomeSkeleton/>
  }
  return (
    <>
    
      <div className="grid grid-cols-3 gap-2">
        <CardStat
          icon={<FaUser />}
          count={data
          }
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
          count={190}
          desc={" Siswa"}
          color={"bg-gray-600"}
        />
         <CardStat
          icon={<AiFillMail/>}
          count={countTemplates.data}
          desc={" Template Surat"}
          color={"bg-red-400"}
        />
        <CardStat
          icon={<FaMailBulk />}
          count={190}
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
    </>
  );
}

export default Home;
