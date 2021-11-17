import { storage } from './config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const uploadFileProgress = async (file, subFolder, imageName, setProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, subFolder + '/' + imageName);

    const upload = uploadBytesResumable(storageRef, file);
    upload.on(
      'state_changed',
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      },
    );
  });
};

export default uploadFileProgress;
