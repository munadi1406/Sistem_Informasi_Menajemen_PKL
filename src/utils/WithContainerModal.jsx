import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import PropTypes from "prop-types";
import ButtonCustom from "../components/ButtonCustom";

const WithContainerModal = (OriginalComponent) => {
  const WrapperComponent = (props) => {
    return (
      <Dialog
        open={props.open}
        handler={props.handleOpen}
        className="max-h-[90vh] overflow-y-auto"
        size={props.size}
      >
        <DialogHeader>{props.title}</DialogHeader>
        <DialogBody>
          <OriginalComponent {...props} />
          <div className="w-full grid grid-cols-1 my-2">
            <ButtonCustom
              text={"Tutup"}
              color="red"
              onClick={props.handleOpen}
            />
          </div>
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
