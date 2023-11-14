import TextInput from "../../components/TextInput";
import ButtonCustom from "../../components/ButtonCustom";

export default function Profile() {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 ">
        <h5 className="text-xl text-black font-semibold">Informasi Akun </h5>

        <form className="flex flex-col gap-2 w-full">
          <TextInput label={"Username"} required />
          <TextInput label={"Email"} disabled />
          <div>
            <ButtonCustom text={"Simpan"} type="submit" />
          </div>
        </form>
      </div>
      <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 ">
        <h5 className="text-xl text-black font-semibold">Ganti Password </h5>
        <form className="flex flex-col gap-2 w-full">
          <TextInput label={"Password Baru"} required />
          <TextInput label={"Konfirmasi Password Baru"} required />
          <p className="text-xs font-semibold text-blue-600 capitalize">
            Password minimal 6 karakter Harus Mengandung Huruf Besar, huruf
            kecil, angka dan karakter khusus !!!
          </p>
          <div>
            <ButtonCustom text={"Ganti Password"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
