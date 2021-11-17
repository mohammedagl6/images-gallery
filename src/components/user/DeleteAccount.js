import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext';
import { deleteUser } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from '@firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';
import { db, storage } from '../../firebase/config';

export default function DeleteAccount() {
  const { modal, setModal, currentUser, alert, setAlert } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, 'gallery'),
        where('uid', '==', currentUser.uid),
      );
      const querySnapshot = await getDocs(q);
      const storePromises = [];
      const storagePromises = [];
      querySnapshot.forEach((item) => {
        const imgRef = ref(storage, `gallery/${currentUser.uid}/${item.id}`);
        storePromises.push(deleteDoc(doc(db, 'gallery', item.id)));
        storagePromises.push(deleteObject(imgRef));
      });

      await Promise.all(storePromises);
      await Promise.all(storagePromises);
      await deleteDoc(doc(db, 'profile', currentUser.uid));
      if (currentUser?.photoURL) {
        const imageName = currentUser?.photoURL
          ?.split(`${currentUser.uid}%2F`)[1]
          ?.split('?')[0];
        if (imageName) {
          try {
            deleteObject(
              ref(storage, `profile/${currentUser.uid}/${imageName}`),
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
      await deleteUser(currentUser);

      setAlert({
        ...alert,
        isAlert: true,
        severity: 'success',
        message: 'Your account has been deleted!',
        timeout: 8000,
        location: 'main',
      });
      setModal({ ...modal, isOpen: false });
    } catch (error) {
      setAlert({
        ...alert,
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
        location: 'modal',
      });
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' endIcon={<SendIcon />} type='submit'>
            Confirm
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
