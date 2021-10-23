import { db } from './config';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';

const useFirestore = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'images'), orderBy('timestamp', 'desc'));
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
