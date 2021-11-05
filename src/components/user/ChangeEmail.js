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
import { updateEmail } from '@firebase/auth';
import ModalSuccess from '../modal/ModalSuccess';

export default function ChangeEmail() {
  const { currentUser, alert, setAlert, modal, setModal } = useAuth();
  const emailRef = useRef(currentUser.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(currentUser, emailRef.current.value);
      setModal({ ...modal, content: '' });
      setAlert({
        ...alert,
        isAlert: true,
        severity: 'success',
        message: 'Your email has been updated successfully',
        timeout: 5000,
        closeModal: true,
      });
    } catch (error) {
      setAlert({
        ...alert,
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
      });
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            You can change your email by updating this field:
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
            inputRef={emailRef}
            defaultValue={currentUser.email}
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
