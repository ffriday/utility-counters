import { DBPaths, type Counters } from '@/constants';
import { db } from '@/main';
import { collection, doc, getDoc, getDocs, setDoc, type DocumentData } from 'firebase/firestore';


export const pushCounters = async (id: string, year: number, month: number, counters: Counters) => {
  const counterRef = collection(db, DBPaths.users, id, DBPaths.year, year.toString(), DBPaths.month);
  return await setDoc(doc(counterRef, month.toString()), counters);
}

export const getCounter = async (id: string, year: number, month: number): Promise<Counters | undefined> => {
  const counterRef = doc(db, DBPaths.users, id, DBPaths.year, year.toString(), DBPaths.month, month.toString());
  const docSnap = await getDoc(counterRef);
  if (docSnap.exists()) {
    return docSnap.data() as Counters;
  } else {
    return undefined;
  }
}

export const getCounters = async (id: string, year: number): Promise<Counters[] | undefined> => {
  const countersRef = collection(db, DBPaths.users, id, DBPaths.year, year.toString(), DBPaths.month);
  const docSnap = await getDocs(countersRef);
  if (!docSnap.empty) {
    const data: DocumentData[] = [];
    docSnap.forEach((doc) => data.push(doc.data()));
    return data as Counters[];
  } else {
    return undefined;
  }
}