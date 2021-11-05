import { useState } from 'react';

import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/AuthContext';
import Login from './user/Login';
import Profile from './user/Profile';
import AccountSettings from './user/Settings';

export default function Nav() {
  const { currentUser, logout, setModal, modal } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLoginModal = () => {
    setModal({ ...modal, isOpen: true, content: <Login /> });
  };
  const handleProfileModal = () => {
    setModal({
      ...modal,
      isOpen: true,
      title: 'User Profile',
      content: <Profile />,
    });
  };
  const handleSettingsModal = () => {
    setModal({
      ...modal,
      isOpen: true,
      title: 'Account Settings',
      content: <AccountSettings />,
    });
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {!currentUser ? (
          <Button startIcon={<LockIcon />} onClick={handleLoginModal}>
            Login
          </Button>
        ) : (
          <Tooltip title='Account settings'>
            <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={currentUser?.photoURL}
              >
                {currentUser?.email?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
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
        <MenuItem onClick={handleProfileModal}>
          <Avatar src={currentUser?.photoURL} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSettingsModal}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
