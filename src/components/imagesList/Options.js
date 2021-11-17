import { useState } from 'react';

import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc } from '@firebase/firestore';
import { db, storage } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { deleteObject, ref } from '@firebase/storage';

export default function Options({ imageId }) {
  const { alert, setAlert, currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'gallery', imageId));
      const imageRef = ref(storage, `gallery/${currentUser.uid}/${imageId}`);
      await deleteObject(imageRef);
    } catch (error) {
      setAlert({
        ...alert,
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 8000,
        location: 'main',
      });
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Tooltip title='Options'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{
              ml: 2,
              position: 'absolute',
              right: 0,
              top: 0,
              color: 'white',
              background: 'rgba(0,0,0,0.3)',
            }}
          >
            <MoreVertIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
