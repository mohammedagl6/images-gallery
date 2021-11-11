import { storage } from './config';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

const uploadFile = async (file, subFolder) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, subFolder + '/' + file.name);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};

export default uploadFile;
