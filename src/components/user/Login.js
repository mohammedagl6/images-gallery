import { useEffect, useRef, useState } from "react";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material/";

import SendIcon from "@mui/icons-material/Send";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../../context/AuthContext";
import ResetPassword from "./ResetPassword";

export default function FormDialog() {
  const [isRegister, setIsRegister] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const {
    login,
    signUp,
    loginWithGoogle,
    modal,
    setModal,
    alert,
    setAlert,
    setLoading,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password, confirmPassword } = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef?.current?.value,
    };
    if (isRegister) {
      try {
        if (password !== confirmPassword) {
          return setAlert({
            ...alert,
            isAlert: true,
            severity: "error",
            message: "Passwords don't match!",
            timeout: 5000,
            location: "modal",
          });
        }

        await signUp(email, password);

        setModal({ ...modal, isOpen: false });
      } catch (error) {
        setAlert({
          ...alert,
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 5000,
          location: "modal",
        });
        console.error(error);
      }
    } else {
      try {
        await login(email, password);
        setModal({ ...modal, isOpen: false });
      } catch (error) {
        setAlert({
          ...alert,
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 5000,
          location: "modal",
        });
        console.error(error);
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setModal({ ...modal, isOpen: false });
    } catch (error) {
      setAlert({
        ...alert,
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 5000,
        location: "modal",
      });
      console.error(error);
    }
  };
  useEffect(() => {
    if (isRegister) {
      setModal({ ...modal, title: "Register" });
    } else {
      setModal({ ...modal, title: "Login" });
    }
  }, [isRegister]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please enter your email address and password here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            inputRef={emailRef}
            required
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            inputRef={passwordRef}
            required
          />
          {isRegister && (
            <TextField
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
              inputRef={confirmPasswordRef}
              required
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            size="small"
            onClick={() =>
              setModal({
                ...modal,
                title: "Reset Password",
                content: <ResetPassword />,
              })
            }
          >
            Forgot Password
          </Button>
          <Button variant="contained" endIcon={<SendIcon />} type="submit">
            {isRegister ? "Register" : "Login"}
          </Button>
        </DialogActions>
      </form>
      <DialogActions style={{ justifyContent: "left" }}>
        <DialogContentText>
          {isRegister
            ? "Do you have an account? Create new one"
            : "Don't you have an account? Create new one"}

          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login " : "Register"}
          </Button>
        </DialogContentText>
      </DialogActions>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </DialogActions>
    </>
  );
}
