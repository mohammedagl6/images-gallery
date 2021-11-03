import { useRef } from 'react';
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
} from '@firebase/auth';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';

export default function ReAuth({ action }) {
  const passwordRef = useRef();
  const { setIsOpen, currentUser, setModalContent } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        passwordRef.current.value,
      );
      await reauthenticateWithCredential(currentUser, credential);

      if (action === 'changePassword') {
        setModalContent(<ChangePassword />);
      } else if (action === 'changeEmail') {
        setModalContent(<ChangeEmail />);
      } else if (action === 'deleteAccount') {
        setModalContent(<DeleteAccount />);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle>
        Re-Login
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
            Please enter your current password.
          </DialogContentText>
          <TextField
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
            inputRef={passwordRef}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' endIcon={<SendIcon />} type='submit'>
            Submit
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
