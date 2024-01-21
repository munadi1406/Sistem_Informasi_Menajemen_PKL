import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { IoCloseCircle } from "react-icons/io5";

const WithContainerModal = (OriginalComponent) => {
  const WrapperComponent = (props) => {
    return (
      <Dialog
        open={props.open}
        handler={props.handleOpen}
        className="max-h-[90vh] overflow-auto"
        size={props.size}
      >
        <DialogHeader className="bg-blue-300 top-0 sticky z-20">
          <div className="flex justify-between w-full text-white">
            <div>{props.title}</div>
            <IoCloseCircle
              onClick={props.handleOpen}
              className="cursor-pointer"
            />
          </div>
        </DialogHeader>
        <DialogBody className="bg-white max-h-[80vh] overflow-auto">
          <OriginalComponent {...props} />
        </DialogBody>
      </Dialog>
   
    );
  };
  WrapperComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  };
  WrapperComponent.defaultProps = {
    title: "",
    size: "xl",
  };
  return WrapperComponent;
};

export default WithContainerModal;
