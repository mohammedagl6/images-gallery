import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

const addDocument = async (url) => {
  try {
    const docRef = await addDoc(collection(db, 'images'), {
      imageUrl: url,
      timestamp: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export default addDocument;
