import { useRef, useState } from 'react';
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Avatar,
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { currentUser, setIsOpen, updateUserProfile } = useAuth();
  const [name, setName] = useState(currentUser.displayName);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle>
        Profile
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
            You can update your profile by updating these fields:
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
          <Avatar
            alt={currentUser?.displayName}
            src={currentUser?.photoURL}
            sx={{ width: 56, height: 56 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={handleClose}
            endIcon={<SendIcon />}
            type='submit'
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
