import { useState } from "react";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  Avatar,
} from "@mui/material/";

import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../context/AuthContext";
import uploadFile from "../../firebase/uploadFile";
import { v4 as uuidv4 } from "uuid";
import { deleteObject, ref } from "@firebase/storage";
import { storage } from "../../firebase/config";

export default function Profile() {
  const { currentUser, updateUserProfile, setLoading, alert, setAlert } =
    useAuth();
  const [name, setName] = useState(currentUser.displayName);
  const [photoUrl, setPhotoUrl] = useState(currentUser?.photoURL);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (file) {
      const imageName = uuidv4() + "." + file.name.split(".").pop();
      try {
        const url = await uploadFile(
          file,
          `profile/${currentUser.uid}`,
          imageName
        );

        if (currentUser?.photoURL) {
          const prevImage = currentUser?.photoURL
            ?.split(`${currentUser.uid}%2F`)[1]
            ?.split("?")[0];
          if (prevImage) {
            try {
              deleteObject(
                ref(storage, `profile/${currentUser.uid}/${prevImage}`)
              );
            } catch (error) {
              console.log(error);
            }
          }
        }

        await updateUserProfile({ displayName: name, photoURL: url });
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
        await updateUserProfile({ displayName: name });
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
    setAlert({
      ...alert,
      isAlert: true,
      severity: "success",
      message: "Your profile updated successfully",
      timeout: 3000,
      location: "modal",
    });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFile(file);
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating these fields:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              alt={currentUser?.displayName}
              src={photoUrl}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" endIcon={<SendIcon />} type="submit">
            Update
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
