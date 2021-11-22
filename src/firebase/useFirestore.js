import { db } from './config';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const useFirestore = (collectionName) => {
  const [documents, setDocuments] = useState([]);
  const { alert, setAlert } = useAuth();
  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy('timestamp', 'desc'),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      let usersIds = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, data: doc.data() });
        usersIds.push(doc.data().uid);
      });
      usersIds = [...new Set(usersIds)];
      let usersInfo = {};
      const promises = [];
      while (usersIds.length) {
        const partIds = usersIds.splice(0, 10); //firebase accepts only 10 items per request
        const q = query(collection(db, 'profile'), where('uid', 'in', partIds));
        promises.push(getDocs(q));
      }
      Promise.all(promises)
        .then((res) => {
          res.flat().forEach((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              usersInfo = { ...usersInfo, [doc.id]: doc.data() };
            });
          });
          const imagesWithUsers = docs.map((doc) => {
            return { ...doc, userInfo: usersInfo[doc.data.uid] };
          });
          console.log(imagesWithUsers)
          setDocuments(imagesWithUsers);
        })
        .catch((error) => {
          setAlert({
            ...alert,
            isAlert: true,
            severity: 'error',
            message: error.message,
            timeout: 8000,
            location: 'main',
          });
          console.log(error);
        });
    });
    return () => unsubscribe();
  }, []);

  return { documents };
};
export default useFirestore;
