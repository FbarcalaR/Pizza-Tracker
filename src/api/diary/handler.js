import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, query } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { db } from '@/api/firebase/firebase-db'

async function getCollectionName() {
    const auth = getAuth();
    const user = auth.currentUser;
    if(!user) return null;
    const collectionName = `users/${user.uid}/diary-entries`;
    return collectionName;
}

function getCreationTime(diaryEntry) {
    const time = Date.parse(diaryEntry.createdAt);
    return isNaN(time) ? 0 : time;
}

function byNewestFirst(a, b) {
    const timeDiff = getCreationTime(b) - getCreationTime(a);
    if(timeDiff !== 0) return timeDiff;
    return +b.id - +a.id;
}

export const saveDiaryEntry = async (diaryEntry) => {
    try {
        const collectionName = await getCollectionName();
        if(!collectionName) return;
        await setDoc(doc(db, collectionName, diaryEntry.id), diaryEntry, { merge: true });
    } catch(err) {
        console.log(err)
    }
}

export const createDiaryEntry = async (diaryEntry) => {
    const diaryEntries = await getAllDiaryEntries();
    const id = (Math.max(0, ...diaryEntries.map(r => +r.id)) + 1).toString();
    const newDiaryEntry = {
        ...diaryEntry,
        id,
        createdAt: new Date().toISOString()
    };
    try {
        const collectionName = await getCollectionName();
        if(!collectionName) return;
        await setDoc(doc(db, collectionName, id), newDiaryEntry);
        return id;
    } catch(err) {
        console.log(err)
    }
}

export const saveNewDiaryEntryFromCalculator = async (diaryEntryBody) => {
    return await createDiaryEntry({
        title: new Date().toLocaleDateString('ES'),
        body: diaryEntryBody
    });
}

export const getAllDiaryEntries = async () => {
    const collectionName = await getCollectionName();
    if(!collectionName) return [];
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q)

    const res = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));
    return res.sort(byNewestFirst);
}

export const getDiaryEntry = async (id) => {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw Error('No diary entry exist with id ' + id);
    }
}

export const removeDiaryEntry = async (id) => {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
    await deleteDoc(doc(db, collectionName, id));
};
