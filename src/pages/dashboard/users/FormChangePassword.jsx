/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-refresh/only-export-components */

import ButtonCustom from "../../../components/ButtonCustom";
import WithContainerModal from "../../../utils/WithContainerModal";
import { useState } from "react";
import Loader from "../../../components/Loader";

import TextInput from "../../../components/TextInput";
import { useMutation } from "react-query";
import { changePasswordForAdmin } from "../../../api/users";
import { useAlertNotification } from "../../../store/store";

import PropTypes from "prop-types";

const FormChangePassword = ({ handleOpen, currentId }) => {
    const { setOpen, setStatus, setMsg } = useAlertNotification((state) => state);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const handleChangePassword = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const isSubmit = await changePasswordForAdmin({
        idUsers: currentId,
        password,
        confirmPassword,
      });
      return isSubmit.data;
    },
    onSuccess: (data) => {
      handleOpen(0);
      setPassword(null);
      setConfirmPassword(null);
      setOpen(true);
      setStatus(true);
      setMsg(data.message);
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
    },
  });

  return (
    <div className="bg-white rounded-md px-2 py-3 flex flex-col gap-4 ">
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
          Password minimal 6 karakter Harus Mengandung Huruf Besar, huruf kecil,
          angka dan karakter khusus !!!
        </p>
        <p className="text-xs font-semibold text-red-400 capitalize">
          {errorMsg}
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
  );
};

FormChangePassword.propTypes = {
  handleOpen: PropTypes.func,

  currentId: PropTypes.number,
};
export default WithContainerModal(FormChangePassword);
