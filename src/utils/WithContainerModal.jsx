import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import PropTypes from 'prop-types'


const WithContainerModal = (OriginalComponent) => {
    const WrapperComponent = (props) => {
        return (
            <Dialog open={props.open} handler={props.handleOpen} className="max-h-[90vh] overflow-y-auto" size="xl">
                <DialogHeader>{props.title}</DialogHeader>
                <DialogBody>
                    <OriginalComponent {...props} />
                </DialogBody>
            </Dialog>
        );
    };
    WrapperComponent.propTypes = {
        open: PropTypes.bool.isRequired,
        handleOpen: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    }
    return WrapperComponent;
};


export default WithContainerModal;
