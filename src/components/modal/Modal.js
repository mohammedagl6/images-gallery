import { Dialog, DialogTitle, IconButton } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext';
import Notify from '../Notify';

const Modal = () => {
  const { modal, setModal, alert, setAlert } = useAuth();
  const handleClose = () => {
    setModal({ ...modal, isOpen: false });
    if (alert?.location === 'modal' && alert?.isAlert) {
      setAlert({ ...alert, isAlert: false });
    }
  };
  return (
    <Dialog
      open={modal.isOpen}
      onClose={() => setModal({ ...modal, isOpen: false })}
    >
      <DialogTitle>
        {modal.title}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {alert?.location === 'modal' && alert?.isAlert && <Notify />}
      {modal.content}
    </Dialog>
  );
};

export default Modal;
