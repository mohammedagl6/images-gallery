import { useEffect, useState } from 'react';
import { Box, Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Notification({ severity, content, timeout = null }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    let timer;
    if (timeout) {
      timer = setTimeout(() => setOpen(false), timeout);
    }
    return () => clearTimeout(timer);
  }, [timeout]);
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {content}
        </Alert>
      </Collapse>
    </Box>
  );
}
