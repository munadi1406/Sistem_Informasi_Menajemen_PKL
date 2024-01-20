import { useState, lazy } from "react";
import logoSma1 from "../../assets/logosma1.webp";
import smaImage from "../../assets/sman.webp";
import TextInput from "../../components/TextInput";
const Register = lazy(() => import("./Register"));
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import ButtonCustom from "../../components/ButtonCustom";
import { useMutation } from "react-query";
import { auth } from "../../api/authRegister";
import Helmet from "../../utils/Helmet";
import LazyImage from "../../components/LazyImage";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const login = await auth(email, password);
      return login;
    },
    onSuccess: (data) => {
      navigate("/dashboard");
      sessionStorage.setItem("at", data.data.data.accessToken);
      sessionStorage.setItem("rt", data.data.data.refreshToken);
    },
    onError: (error) => {
      setMsg(error.response.data.message);
    },
  });
  return (
    <>
      <Helmet title="SISTEM INFORMASI ADMINISTRASI SMAN 1 KARANG INTAN"/>
      <div className="h-screen w-screen lg:grid lg:grid-cols-2 overflow-clip flex justify-center items-center">
        <Register open={open} handleOpen={handleOpen} title={"Register"} />
        <div className="relative lg:block hidden">
          <LazyImage
            src={smaImage}
            alt="SISTEM INFORMASI ADMINISTRASI SMAN 1 KARANG INTAN"
            className="h-screen object-cover relative z-0"
            width="100%"
            height="100%"
          />
          <div className="bg-black/50 top-0 left-0 absolute z-10 w-full h-full"></div>
          <div className="absolute top-0 left-0 z-20 text-white h-full w-full p-2 flex justify-start items-center">
            <div className="flex flex-col gap-2 w-full">
              <p className="flex flex-col text-3xl gap-2">
                Selamat Datang Di Sistem Informasi Administrasi{" "}
                <span className="font-bold text-5xl">SMAN 1 Karang Intan</span>
              </p>
              <hr />
              <p className="text-sm">Belum Punya Akun ?</p>
              <ButtonCustom
                text={"register"}
                className={"w-max"}
                onClick={handleOpen}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-full lg:h-full flex flex-col justify-center items-center h-max lg:rounded-none lg:shadow-none rounded-md shadow-xl">
          <div className="w-full  flex flex-col justify-center items-center gap-2 lg:p-2 p-4">
            <img
              src={logoSma1}
              className="w-32"
              width="100%"
              height="100%"
              alt="Logo Sma"
            />
            <h1 className="font-bold text-3xl text-center">SIAMASAN</h1>
            <p className="text-center ">
              Sistem Informasi Administrasi SMAN 1 Karang Intan
            </p>
            <p className="text-sm font-semibold text-red-500">{msg}</p>
            <form
              className="w-full flex flex-col gap-2 justify-center items-start"
              onSubmit={mutate}
            >
              <TextInput
                label="Email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextInput
                label="Password"
                type={`${showPassword ? "text" : "password"}`}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p
                className="lg:hidden block text-sm cursor-pointer font-semibold text-blue-600 underline"
                onClick={handleOpen}
              >
                Register
              </p>
              <div>
                <Checkbox
                  label="Show Password ?"
                  color="blue"
                  onChange={() => setShowPassword(!showPassword)}
                />
              </div>
              <ButtonCustom
                text={isLoading ? <Spinner /> : "Login"}
                className={"w-full"}
                type="submit"
                disabled={isLoading && true}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
