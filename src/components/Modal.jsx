import { Modal, } from 'rsuite';
import PropTypes from 'prop-types'


const Modals = ({ open, setOpen, children, title }) => {
    const handleClose = () => setOpen(false);

    return (
        <>
            <Modal overflow={true} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className='text-xl font-semibold'>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                
            </Modal>
        </>
    );
};

Modals.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
}


export default Modals