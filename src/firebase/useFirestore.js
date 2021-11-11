import { db } from './config';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useFirestore = (collectionName) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy('timestamp', 'desc'),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, data: doc.data() });
      });
      setDocuments(docs);
    });
    return () => unsubscribe();
  }, []);

  return { documents };
};
export default useFirestore;
