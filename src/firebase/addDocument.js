import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from './config';

const addDocument = async (collectionName, documentObj, id = null) => {
  // const mainRef = collection(db, `gallery/${user.uid}/images`);
  // const userInfoRef = doc(collection(db, 'gallery'), user.uid);
  // await setDoc(userInfoRef, {
  //   uName: user.displayName,
  //   uEmail: user.email,
  //   uPhoto: user.photoURL,
  // });
  // return setDoc(doc(mainRef), { ...documentObj, timestamp: serverTimestamp() });
  let docRef;
  if (id) {
    docRef = doc(collection(db, collectionName), id);
  } else {
    docRef = doc(collection(db, collectionName));
  }
  return setDoc(docRef, {
    ...documentObj,
    timestamp: serverTimestamp(),
  });
};

export default addDocument;
