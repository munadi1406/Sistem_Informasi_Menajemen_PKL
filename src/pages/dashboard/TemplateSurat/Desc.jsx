
export default function Desc() {
  return (
    <div>
      <h1 className="text-lg font-semibold">Keterangan</h1>
      <ul className="list-disc ml-9">
        <li className="font-bold">Semua text yang berada dalam tanda kurung kurawal {} jangan di ubah !!!</li>
        <li>Anda hanya bisa mengubah text yang berada di dalam tanda kurung siku atau anda bisa membuat yang baru</li>
        <li>Jika anda ingin membuat table maka anda bisa membuat nya dengan kurung siku dan di dalamnya anda masukkan nama nama kolom nya yang di pisah kan dengan tanda <span className="font-bold">_</span> (jangan menggunakan spasi untuk memisahkan nama kolom) dan pastikan untuk tipe data yang anda pilih adalah table</li>
        <li>Jika tidak dalam bentuk table anda bisa menggunakan kurung siku dengan hanya satu isian saja dan pilih tipe data nya text</li>
      </ul>
    </div>
  )
}
