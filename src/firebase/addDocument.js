import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

const addDocument = (collectionName, documentObj) => {
  return addDoc(collection(db, collectionName), {
    ...documentObj,
    timestamp: serverTimestamp(),
  });
};

export default addDocument;
