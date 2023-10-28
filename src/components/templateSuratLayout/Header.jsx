import LogoKalsel from "../../assets/logokalsel.png";
import LogoSekolah from "../../assets/logosma1.png";

export default function Header() {
    return (
        <div className="pb-3 border-b-2 border-black mb-6 flex justify-center items-center ">
            <div className="flex w-full justify-center items-center gap-2">
                <div>
                    <img src={LogoKalsel} width={60} className="block"/>
                </div>
                <div className="font-sans">
                    <p className="text-center  text-xl font-semibold uppercase">
                        Pemerintah Provinsi Kalimantan Selatan
                    </p>
                    <p className="text-center font-semibold text-xl">
                        DINAS PENDIDIKAN DAN KEBUDAYAAN
                    </p>
                    <p className="text-center font-semibold text-xl">
                        SMAN 1 KARANG INTAN
                    </p>
                    <p className="text-center text-xs">
                        Alamat ; Jalan Ir. Pangeran Muhammad Noor Km.47 telp/fax
                        telpon (0511)5920241 Mandiangin Kab.Banjar
                    </p>
                    <p className="flex gap-2 text-xs justify-center items-center">
                        <span> Website : sma1karangintan.sch.id</span>
                        <span>
                            Email : <span className="text-blue-600 underline">sman1ki@yahoo.co.id/sman1kintan@gmail.com</span>
                        </span>
                    </p>
                </div>
                <div>
                    <img src={LogoSekolah} width={90} className="block" />
                </div>
            </div>
        </div>
    );
}
