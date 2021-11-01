import { storage } from './config';
import { ref, getDownloadURL } from 'firebase/storage';

const uploadFile = async (file) => {
  const storageRef = ref(storage, file.name);

  return await getDownloadURL(storageRef);
};

export default uploadFile;
