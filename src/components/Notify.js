import { useEffect, useRef } from 'react';
import { Box, Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';

export default function Notify() {
  const {
    alert: { isAlert, timeout, message, severity },
    setAlert,
  } = useAuth();
  const alertRef = useRef();
  useEffect(() => {
    alertRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
    let timer;
    if (timeout) {
      timer = setTimeout(() => {
        setAlert({ ...alert, isAlert: false });
      }, timeout);
    }
    return () => clearTimeout(timer);
  }, [timeout]);
  return (
    <Box sx={{ width: '100%' }} ref={alertRef}>
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
  );
}
