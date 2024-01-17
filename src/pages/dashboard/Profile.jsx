import TextInput from "../../components/TextInput";
import ButtonCustom from "../../components/ButtonCustom";
import { useQuery, useMutation } from "react-query";
import {
  getDetailUsers,
  changeUsername,
  changePassword,
} from "../../api/users";
import Loader from "../../components/Loader";
import { useState } from "react";
import { useAlertNotification, useDataUser } from "../../store/store";


export default function Profile() {
  const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const { setUsername } = useDataUser((state) => state);

  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgPassword, setErrorMsgPassword] = useState("");
  const [username, setUsernames] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { data, isLoading } = useQuery("detailUsers", {
    queryFn: async () => {
      const datas = await getDetailUsers();
      return datas.data.data;
    },
  });

  const handleChangeUsername = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const isSubmit = await changeUsername({
        username,
      });
      return isSubmit.data;
    },
    onSuccess: (data) => {
      setUsername(username);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });
  const handleChangePassword = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const isSubmit = await changePassword({
        password,
        confirmPassword,
      });
      return isSubmit.data;
    },
    onSuccess: (data) => {
      setPassword(null);
      setConfirmPassword(null);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError: (error) => {
      setErrorMsgPassword(error.response.data.message);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 ">
        <h5 className="text-xl text-black font-semibold">Informasi Akun </h5>

        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={handleChangeUsername.mutate}
        >
          <TextInput
            label={"Username"}
            required
            defaultValue={data.username}
            onChange={(e) => setUsernames(e.target.value)}
          />
          <p className="text-xs font-semibold text-red-500">{errorMsg}</p>
          <TextInput label={"Email"} disabled defaultValue={data.email} />
          <div>
            <ButtonCustom
              text={handleChangeUsername.isLoading ? <Loader /> : "Simpan"}
              type="submit"
              disabled={handleChangeUsername.isLoading}
            />
          </div>
        </form>
      </div>
      <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 ">
        <h5 className="text-xl text-black font-semibold">Ganti Password </h5>
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={handleChangePassword.mutate}
        >
          <TextInput
            label={"Password Baru"}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            label={"Konfirmasi Password Baru"}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="text-xs font-semibold text-blue-600 capitalize">
            Password minimal 6 karakter Harus Mengandung Huruf Besar, huruf
            kecil, angka dan karakter khusus !!!
          </p>
          <div>
            <ButtonCustom
              text={
                handleChangePassword.isLoading ? <Loader /> : "Ganti Password"
              }
              type="submit"
              disabled={handleChangePassword.isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
