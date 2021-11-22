import {
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material/";
import { useAuth } from "../../context/AuthContext";
import ReAuth from "./ReAuth";
import { GoogleAuthProvider, reauthenticateWithPopup } from "@firebase/auth";
import ChangeEmail from "./ChangeEmail";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
  const { modal, setModal, currentUser, alert, setAlert } = useAuth();
  const handleAction = async (action) => {
    if (currentUser.providerData[0].providerId === "password") {
      setModal({
        ...modal,
        title: "Re-Login",
        content: <ReAuth action={action} />,
      });
    } else {
      try {
        await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());
        if (action === "deleteAccount") {
          setModal({
            ...modal,
            title: "Delete Account",
            content: <DeleteAccount />,
          });
        } else if (action === "changeEmail") {
          setModal({
            ...modal,
            title: "Update Email",
            content: <ChangeEmail />,
          });
        }
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
  };

  return (
    <>
      <DialogContent dividers>
        <DialogContentText>
          For security reason, You need to enter your credentials to do any of
          these actions:
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", gap: "1rem" }}>
        {currentUser.providerData[0].providerId === "password" && (
          <Button
            onClick={() =>
              setModal({
                ...modal,
                title: "Re-Login",
                content: <ReAuth action="changePassword" />,
              })
            }
          >
            Change Password
          </Button>
        )}
        <Button onClick={() => handleAction("changeEmail")}>
          Change Email
        </Button>
        <Button onClick={() => handleAction("deleteAccount")}>
          Delete The Account
        </Button>
      </DialogActions>
    </>
  );
}
