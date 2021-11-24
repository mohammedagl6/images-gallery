import { useRef } from "react";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../context/AuthContext";

export default function ResetPassword() {
  const { modal, setModal, resetPassword, alert, setAlert, setLoading } =
    useAuth();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(emailRef.current.value);
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
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Enter your email you registered already with:
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
        </DialogContent>
        <DialogActions>
          <Button variant="contained" endIcon={<SendIcon />} type="submit">
            Send Reset Link
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
