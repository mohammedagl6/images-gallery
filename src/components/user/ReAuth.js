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
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
} from '@firebase/auth';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';

export default function ReAuth({ action }) {
  const passwordRef = useRef();
  const { modal, setModal, currentUser, alert, setAlert } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        passwordRef.current.value,
      );
      await reauthenticateWithCredential(currentUser, credential);

      if (action === 'changePassword') {
        setModal({
          ...modal,
          title: 'Change Password',
          content: <ChangePassword />,
        });
      } else if (action === 'changeEmail') {
        setModal({ ...modal, title: 'Update Email', content: <ChangeEmail /> });
      } else if (action === 'deleteAccount') {
        setModal({
          ...modal,
          title: 'Delete Account',
          content: <DeleteAccount />,
        });
      }
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
