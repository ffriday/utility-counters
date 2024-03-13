import { v4 as uuidv4 } from 'uuid';
import { DBPaths, type Counters, type Apart } from '@/constants';
import { db } from '@/main';
import { collection, doc, getDoc, getDocs, setDoc, type DocumentData } from 'firebase/firestore';

export const createApart = async (userId: string, name: string) => {
  const counterRef = collection(db, DBPaths.apart);
  const apart: Apart = {
    name: name,
    owner: userId,
    link: uuidv4(),
    shared: false
  }
  return await setDoc(doc(counterRef), apart);
}

export const updateApart = async (apartId: string, apart: Partial<Apart>) => {
  const counterRef = collection(db, DBPaths.apart);
  return await setDoc(doc(counterRef, apartId), apart);
}

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

export const getProjects = async () => {
  const countersRef = collection(db, DBPaths.apart);
  const docSnap = await getDocs(countersRef);
  if (!docSnap.empty) {
    const data: DocumentData[] = [];
    docSnap.forEach((doc) => data.push(doc.data()));
    return data as Counters[];
  } else {
    return undefined;
  }
}