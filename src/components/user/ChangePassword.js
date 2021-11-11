import { useRef } from 'react';
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext';
import { updatePassword } from '@firebase/auth';

export default function ChangePassword() {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { currentUser, alert, setAlert, modal, setModal } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordRef.current.value) {
      return setAlert({
        ...alert,
        isAlert: true,
        severity: 'error',
        message: 'Enter Password',
        timeout: 5000,
        location: 'modal',
      });
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setAlert({
        ...alert,
        isAlert: true,
        severity: 'error',
        message: "Passwords don't match",
        timeout: 5000,
        location: 'modal',
      });
    }

    try {
      await updatePassword(currentUser, passwordRef.current.value);

      setAlert({
        ...alert,
        isAlert: true,
        severity: 'success',
        message: 'Your Password has been updated',
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
          <DialogContentText>Please enter your new Password</DialogContentText>
          <TextField
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
            inputRef={passwordRef}
          />
          <TextField
            margin='dense'
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            fullWidth
            variant='standard'
            inputRef={confirmPasswordRef}
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
