import { useQuery } from "react-query";
import { getDetailKepsek } from "../../api/kepsek";

export default function Footer() {
    const { data, isLoading } = useQuery("kepalaSekolah", {
        queryFn: async () => {
          const data = await getDetailKepsek();
          return data.data;
        },
      });
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthName = [
        "Januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember",
    ];
    if(isLoading){
        return <>Loading...</>
    }
    return (
        <div className="border flex justify-end text-[12px]">
        {console.log(data)}
            <div className="w-max h-[150px] text-[14px] flex flex-col justify-between">
                <div>
                    <div>
                        Karang Intan,{" "}
                        <span className="capitalize">{`${day} ${monthName[month]} ${year}`}</span>
                    </div>
                    <div>Kepala Sekolah</div>
                </div>
                <div>
                    <p>{data.data.user.username}</p>
                    <p>Pembina Tingkat I</p>
                    <p>NIP. {data.data.nip}</p>
                </div>
            </div>
        </div>
    );
}
