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
import { updatePassword } from '@firebase/auth';

export default function ChangePassword() {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { setIsOpen, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePassword(currentUser, passwordRef.current.value);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle>
        New Password
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
