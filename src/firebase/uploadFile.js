import { storage } from './config';
import { ref, getDownloadURL } from 'firebase/storage';

const uploadFile = (file) => {
  const storageRef = ref(storage, file.name);

  return getDownloadURL(storageRef);
};

export default uploadFile;
