import { useRef, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext';

export default function FormDialog() {
  const [isRegister, setIsRegister] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { login, signUp, isOpen, setIsOpen } = useAuth();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      try {
        await signUp(emailRef.current.value, passwordRef.current.value);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await login(emailRef.current.value, passwordRef.current.value);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          {isRegister ? 'Register' : 'Login'}
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
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <DialogContentText>
              Please enter your email address and password here
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
            />
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              variant='standard'
              inputRef={passwordRef}
            />
            {isRegister && (
              <TextField
                margin='dense'
                id='confirmPassword'
                label='Confirm Password'
                type='password'
                fullWidth
                variant='standard'
                inputRef={confirmPasswordRef}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              onClick={handleClose}
              endIcon={<SendIcon />}
              type='submit'
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </DialogActions>
        </form>
        <DialogActions style={{ justifyContent: 'left' }}>
          <DialogContentText>
            {isRegister
              ? 'Do you have an account? Create new one'
              : "Don't you have an account? Create new one"}

            <Button onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Login ' : 'Register'}
            </Button>
          </DialogContentText>
        </DialogActions>
      </Dialog>
    </div>
  );
}
