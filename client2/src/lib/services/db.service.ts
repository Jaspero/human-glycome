import {
  collection,
  query,
  limit,
  getDocs,
  orderBy,
  startAfter,
  doc,
  getDoc
} from 'firebase/firestore';
import {db} from '$lib/firebase';

export async function getCollection<T>(
  path: string,
  options: {
    limit?: number;
    orderByField?: string;
    orderDirection?: 'asc' | 'desc';
    lastVisible?: any;
  } = {}
) {
  const collRef = collection(db, path);
  const constraints: any[] = [];

  if (options.orderByField) {
    constraints.push(
      orderBy(options.orderByField, options.orderDirection || 'asc')
    );
  }

  if (options.limit) {
    constraints.push(limit(options.limit));
  }

  if (options.lastVisible) {
    constraints.push(startAfter(options.lastVisible));
  }

  const q = query(collRef, ...constraints);
  const snapshot = await getDocs(q);
  return {
    items: snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (T & {id: string})[],
    lastVisible: snapshot.docs[snapshot.docs.length - 1]
  };
}

export async function getDocument<T>(path: string, id: string) {
  const docRef = doc(db, path, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as T & {id: string};
  }
  return null;
}
