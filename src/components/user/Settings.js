import {
  Button,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext';
import ReAuth from './ReAuth';
import { GoogleAuthProvider, reauthenticateWithPopup } from '@firebase/auth';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';

export default function Settings() {
  const { setIsOpen, setModalContent, currentUser } = useAuth();
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleAction = async (action) => {
    if (currentUser.providerData[0].providerId === 'password') {
      setModalContent(<ReAuth action={action} />);
    } else {
      await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());
      if (action === 'deleteAccount') {
        setModalContent(<DeleteAccount />);
      } else if (action === 'changeEmail') {
        setModalContent(<ChangeEmail />);
      }
    }
  };
  return (
    <>
      <DialogTitle>
        Account Settings
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
      <DialogContent dividers>
        <DialogContentText>
          For security reason, You need to enter your credentials to do any of
          these actions:
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: '1rem' }}>
        {currentUser.providerData[0].providerId === 'password' && (
          <Button
            onClick={() => setModalContent(<ReAuth action='changePassword' />)}
          >
            Change Password
          </Button>
        )}
        <Button onClick={() => handleAction('changeEmail')}>
          Change Email
        </Button>
        <Button onClick={() => handleAction('deleteAccount')}>
          Delete The Account
        </Button>
      </DialogActions>
    </>
  );
}
