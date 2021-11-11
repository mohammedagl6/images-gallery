import Notification from './Notification';
import { useAuth } from '../../../context/AuthContext';
import { sendEmailVerification } from '@firebase/auth';
import { useState } from 'react';
import { Button } from '@mui/material';
import Notify from '../../Notify';

const Verification = () => {
  const { currentUser, alert, setAlert } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  const verify = async () => {
    setIsClicked(true);
    try {
      await sendEmailVerification(currentUser);
      setAlert({
        ...alert,
        isAlert: true,
        severity: 'info',
        message:
          'Verification link has been sent to your email. Please check your email.',
        timeout: 8000,
        location: 'main',
      });
    } catch (error) {
      setAlert({
        ...alert,
        isAlert: true,
        severity: 'error',
        message: error?.message,
        timeout: 8000,
        location: 'main',
      });
      console.error(error);
    }
  };
  return (
    <>
      {currentUser?.emailVerified === false && (
        <Notification
          severity='warning'
          content={
            <>
              Your email has not been verified yet!
              <Button
                size='small'
                onClick={verify}
                sx={{ lineHeight: 'initial' }}
                disabled={isClicked}
              >
                Verify Now
              </Button>
            </>
          }
        />
      )}
      {alert?.location === 'main' && alert?.isAlert && <Notify />}
    </>
  );
};

export default Verification;
