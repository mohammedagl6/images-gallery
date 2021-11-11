import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext';
import { deleteUser } from 'firebase/auth';

export default function DeleteAccount() {
  const { modal, setModal, currentUser, alert, setAlert } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(currentUser);

      setAlert({
        ...alert,
        isAlert: true,
        severity: 'success',
        message: 'Your account has been deleted!',
        timeout: 8000,
        location: 'main',
      });
      setModal({ ...modal, isOpen: false });
    } catch (error) {
      setAlert({
        ...alert,
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
        location: 'modal',
      });
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' endIcon={<SendIcon />} type='submit'>
            Confirm
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
