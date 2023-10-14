export default function Footer() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthName = [
        "Januari",
        "februaru",
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
    return (
        <div className="border flex justify-end text-[12px]">
            <div className="w-max h-[150px] flex flex-col justify-between">
                <div>
                    <div>
                        Karang Intan,{" "}
                        <span className="capitalize">{`${day} ${monthName[month]} ${year}`}</span>
                    </div>
                    <div>Kepala Sekolah</div>
                </div>
                <div>
                    <p>Hj. Ayu Herlina Rustam,M.Pd</p>
                    <p>Pembina Tingkat I</p>
                    <p>NIP. 19760327 200604 2 01</p>
                </div>
            </div>
        </div>
    );
}
