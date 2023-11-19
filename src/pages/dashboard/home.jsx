
import { useQueries } from "react-query";
import { countUsers, countThisWeek } from "../../api/users";
import { countTemplate } from "../../api/templateSurat";
import CardHomeSkeleton from "../../components/skeleton/CardHomeSkeleton";
import { countStudent } from "../../api/siswa";

import {
  countSurat,
  getSuratKeluarStat,
  getSuratMasukStat,
} from "../../api/surat";
import { getLogStat } from "../../api/log";
import { getSertifikatStat } from "../../api/sertifikat";
import { getTemplateSertifikatStat } from "../../api/templateSertifkat";
import { Suspense, lazy } from "react";
const Statistik = lazy(() => import("./home/Statistik"));

export function Home() {
  const result = useQueries([
    {
      queryKey: ['countUsers', 1], queryFn: async () => {
        const datas = await countUsers();
        return datas.data.data;
      },
      staleTime:10000,
    },
    {
      queryKey: ['usersThisWeek', 2], queryFn: async () => {
        const datas = await countThisWeek();
        return datas.data.data;
      },
      staleTime:10000,
    },
    {
      queryKey: ['studentCount', 3], queryFn: async () => {
        const datas = await countStudent();
        return datas.data.data;
      },
      staleTime:10000,
    },
    {
      queryKey: ['countTemplate', 4], queryFn: async () => {
        const datas = await countTemplate();
        return datas.data.data;
      },
      staleTime:10000,
    },
    {
      queryKey: ['suratCount', 5], queryFn: async () => {
        const datas = await countSurat();
        return datas.data.data;
      },
      staleTime:10000,
    },
    {
      queryKey: ['sertifikatCount', 6], queryFn: async () => {
        const datas = await getSertifikatStat();
        return datas.data.data;
      },
      staleTime:10000,
    },
    {
      queryKey: ['templateSertifikatCount', 7], queryFn: async () => {
        const datas = await getTemplateSertifikatStat();
        return datas.data.data;
      },
      staleTime:10000,
    },

    {
      queryKey: ['suratIn', 8], queryFn: async () => {
        const datas = await getSuratMasukStat();
        return datas.data.data;
      },
      staleTime:10000,
    },
    {
      queryKey: ['suratOut', 9], queryFn: async () => {
        const datas = await getSuratKeluarStat();
        return datas.data.data;
      },
      staleTime:10000,
    },


    {
      queryKey: ['logStat', 10], queryFn: async () => {
        const datas = await getLogStat();
        return datas.data.data;
      },
      staleTime:10000,
    },

  ])

  if (result.some(e => e.isLoading)) {
    return <CardHomeSkeleton />
  }


  return (
    <>
      <Suspense fallback={<CardHomeSkeleton />}>
        <Statistik result={result} />
      </Suspense>
    </>
  );
}

export default Home;
