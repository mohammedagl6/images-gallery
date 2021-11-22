import { collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "./config";

const addDocument = async (collectionName, documentObj, id) => {
  const docRef = doc(collection(db, collectionName), id);

  return setDoc(docRef, {
    ...documentObj,
    timestamp: serverTimestamp(),
  });
};

export default addDocument;
