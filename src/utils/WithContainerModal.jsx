import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { IoCloseCircle } from "react-icons/io5";


const WithContainerModal = (OriginalComponent) => {
  const WrapperComponent = (props) => {
    return (
      <Dialog
        open={props.open}
        handler={props.handleOpen}
        className="max-h-[90vh] overflow-y-auto"
        size={props.size}
      >
        <DialogHeader>
        <div className="flex justify-between w-full">
        <div>
        {props.title}
        </div>
        <IoCloseCircle onClick={props.handleOpen} className="cursor-pointer"/>
        </div>
        </DialogHeader>
        <DialogBody>
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
