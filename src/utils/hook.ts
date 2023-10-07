// firebaseQueries.js
import { query, collection, getDocs, where, DocumentData } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '@/firebase';

// custom hook for fetching all articles
export const useArticles = () => {
  return useQuery('articles', async () => {
    try {
      const articleQuery = query(collection(db, 'Articles'));
      const snapshot = await getDocs(articleQuery);
      if (snapshot.docs.length > 0) {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  });
};

// custom hook for fetching single article
export const useArticle = (id:string) => {
  return useQuery('article', async (): Promise<any> => {
    try {
      const articleQuery = query(collection(db, 'Articles'), where("id", "==", id))
      const snapshot = await getDocs(articleQuery)
      if (snapshot.docs.length > 0) {
        return snapshot.docs.map((doc: DocumentData) => ({
          id: doc.id,
          ...doc.data(),
        }))
      } else {
        return [];
      }
    } catch (error) {
      return []; 
    }
  })
};