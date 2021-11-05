import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext';

export default function ModalAlert() {
  const {
    alert: { isAlert, timeout, message, severity },
    setAlert,
  } = useAuth();
  useEffect(() => {
    let timer;
    if (timeout) {
      timer = setTimeout(() => setAlert({ ...alert, isAlert: false }), timeout);
    }
    return () => clearTimeout(timer);
  }, [timeout, setAlert]);
  return (
    isAlert && (
      <Box sx={{ width: '100%' }}>
        <Collapse in={isAlert}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setAlert({ ...alert, isAlert: false });
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        </Collapse>
      </Box>
    )
  );
}
