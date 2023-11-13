import CardStat from "../../components/CardStat";
import { FaUser,FaUsers,FaChild,FaMailBulk,FaCertificate } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { useQuery } from "react-query";
import { countUsers,countThisWeek } from "../../api/users";
import { countTemplate } from "../../api/templateSurat";

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
    return <>Loading...</>
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
        
      </div>
    </>
  );
}

export default Home;
