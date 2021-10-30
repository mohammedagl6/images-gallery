import { useRef, useState } from 'react';
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
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../context/AuthContext';

export default function FormDialog() {
  const [isRegister, setIsRegister] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { login, signUp, loginWithGoogle, setIsOpen } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      try {
        await signUp(emailRef.current.value, passwordRef.current.value);
        setIsOpen(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await login(
          emailRef.current.value,
          passwordRef.current.value,
        );
        console.log(result);
        setIsOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  };

  return (
    <>
      <DialogTitle>
        {isRegister ? 'Register' : 'Login'}
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
          <Button variant='contained' endIcon={<SendIcon />} type='submit'>
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
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button
          variant='outlined'
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </DialogActions>
    </>
  );
}
