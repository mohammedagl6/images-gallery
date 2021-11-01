import { useState } from 'react';
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
import uploadFile from '../../firebase/uploadFile';

export default function Profile() {
  const { currentUser, setIsOpen, updateUserProfile, setLoading } = useAuth();
  const [name, setName] = useState(currentUser.displayName);
  const [photoUrl, setPhotoUrl] = useState(currentUser?.photoURL);
  const [file, setFile] = useState(null);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (file) {
      try {
        const url = await uploadFile(file);
        await updateUserProfile({ displayName: name, photoURL: url });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateUserProfile({ displayName: name });
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    handleClose();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFile(file);
      setPhotoUrl(URL.createObjectURL(file));
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
          <label htmlFor='profilePhoto'>
            <input
              accept='image/*'
              id='profilePhoto'
              type='file'
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <Avatar
              alt={currentUser?.displayName}
              src={photoUrl}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' endIcon={<SendIcon />} type='submit'>
            Update
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
