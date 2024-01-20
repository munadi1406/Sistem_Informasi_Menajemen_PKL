/* eslint-disable react-refresh/only-export-components */
import { useInfiniteQuery } from "react-query"
import WithContainerModal from "../../utils/WithContainerModal"
import { getListHistorySertifikat } from "../../api/sertifikat"
import Loader from "../Loader";
import ButtonCustom from "../ButtonCustom";
import { useEffect, useTransition, useState } from "react";
import { useInView } from "react-intersection-observer";
import Table from "./Table";
import Cetak from "./Cetak";
import SertifikatStat from "./SertifikatStat";


const History = () => {
  const { ref, inView } = useInView();
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState({});
 
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (filter.startDate && filter.endDate) {
      setIsFilter(true);
      return;
    }
    setIsFilter(false);
  }, [filter]);

  
  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
    remove,
  } = useInfiniteQuery(`historySertifikat`, {
    queryFn: async ({ pageParam }) => {
      const datas = await getListHistorySertifikat(pageParam || 0, `${isFilter
          ? `?startDate=${filter.startDate}&endDate=${filter.endDate}`
          : ""
        }`);
      return datas.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.data.lastId,
  });
  useEffect(() => {
    if(isFilter){
      refetch()
    }
  }, [isFilter,filter]);
  const clearFilter = ()=>{
    setFilter({startDate:null,endDate:null})
    setIsFilter(false)
    remove()
    refetch()
  }
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState('history');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    }); 
  }
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  if (isLoading) {
    return <Loader />
  }
  if (isPending) {
    return <Loader />
  }


  return (
    <div>
      <div className="flex justify-center gap-2 items-center p-2">
        <ButtonCustom text={"History"} className={tab === 'history' ? 'bg-transparant text-blue-600' : ''} onClick={() => {selectTab("history");setFilter({})}} />
        <ButtonCustom text={"Cetak"} className={tab === 'cetak' ? 'bg-transparant text-blue-600' : ''} onClick={() => {selectTab("cetak");setFilter({})}} />
        <ButtonCustom text={"Statistik"} className={tab === 'stat' ? 'bg-transparant text-blue-600' : ''} onClick={() => {selectTab("stat");setFilter({})}} />
      </div>
      {tab === 'history' && <Table data={data} />}
      {tab === 'stat' && <SertifikatStat data={data} />}
      {tab === 'cetak' && <Cetak data={data} handleChange={handleChange} filter={filter} clearFilter={clearFilter}/>}
      {hasNextPage && tab !== 'stat' && (
        <div ref={ref}>
          <ButtonCustom
            text={
              isFetchingNextPage ? (
                <Loader />
              ) : (
                "Load More"
              )
            }
            onClick={
              fetchNextPage
            }
            disabled={
              isFetchingNextPage
            }

          />
        </div>
      )}
    </div>
  )
}

export default WithContainerModal(History)