import { Dialog } from '@mui/material/';
import { useAuth } from '../context/AuthContext';

const Modal = () => {
  const { isOpen, setIsOpen, ModalContent } = useAuth();
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      {ModalContent}
    </Dialog>
  );
};

export default Modal;
