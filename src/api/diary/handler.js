import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, query } from "firebase/firestore"; 
import { db } from '@/api/setup/firebase'

const collectionName = 'diary-entries';

export const saveDiaryEntry = async (diaryEntry) => {    
    try {
        await setDoc(doc(db, collectionName, diaryEntry.id), diaryEntry);
    } catch(err) {
        console.log(err)
    }
}

export const getAllDiaryEntries = async () => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q)

    const res = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));
    return  res;
}

export const getDiaryEntry = async (id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw Error('No dough recipes with id ' + id);
    }
}

export const removeDiaryEntry = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
};
