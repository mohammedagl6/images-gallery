import Notification from '../Notification';
import { useAuth } from '../../context/AuthContext';
import { sendEmailVerification } from '@firebase/auth';
import { useState } from 'react';
import { Button } from '@mui/material';

const Verification = () => {
  const { currentUser } = useAuth();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [err, setErr] = useState(null);
  const verify = async () => {
    setIsClicked(true);
    try {
      await sendEmailVerification(currentUser);
      setIsEmailSent(true);
    } catch (error) {
      setErr(error);
      console.error(error);
    }
  };
  return (
    <>
      {currentUser?.emailVerified === false && !isEmailSent && (
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
      {isEmailSent && (
        <Notification
          severity='info'
          content='Verification link has been sent to your email. Please check your email.'
          timeout={5000}
        />
      )}
      {err?.message && <Notification severity='error' content={err.message} />}
    </>
  );
};

export default Verification;
