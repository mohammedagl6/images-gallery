import { Dialog, DialogTitle, IconButton } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext';
import ModalAlert from './ModalAlert';

const Modal = () => {
  const { modal, setModal } = useAuth();
  return (
    <Dialog
      open={modal.isOpen}
      onClose={() => setModal({ ...modal, isOpen: false })}
    >
      <DialogTitle>
        {modal.title}
        <IconButton
          aria-label='close'
          onClick={() => setModal({ ...modal, isOpen: false })}
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
      <ModalAlert />
      {modal.content}
    </Dialog>
  );
};

export default Modal;
