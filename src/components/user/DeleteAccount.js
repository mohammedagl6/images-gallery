import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext';
import { deleteUser } from 'firebase/auth';

export default function ChangeEmail() {
  const { setIsOpen, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(currentUser);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle>
        Delete Account
        <IconButton
          aria-label='close'
          onClick={() => setIsOpen(false)}
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
