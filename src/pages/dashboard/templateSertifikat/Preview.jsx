/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-refresh/only-export-components */

import { endpoint } from "../../../api/users";
import ButtonCustom from "../../../components/ButtonCustom";
import WithContainerModal from "../../../utils/WithContainerModal";

import PropTypes from "prop-types";

const Form = ({ handleOpen, data }) => {
  
  

  return (
    <div className="space-y-2">
      <img src={`${endpoint}/templateSertifikat/image/${data?.template}`} className='w-full h-auto rounded-md' loading='eager' alt={data?.name} />
    </div>
  );
};

Form.propTypes = {
  handleOpen: PropTypes.func,
  data: PropTypes.object,
};
export default WithContainerModal(Form);
