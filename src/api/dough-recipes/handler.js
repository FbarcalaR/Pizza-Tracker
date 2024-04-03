import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, query } from "firebase/firestore"; 
import { db } from '@/api/setup/firebase'

const collectionName = 'dough-recipes';

export const setDoughRecipe = async (recipe) => {    
    try {
        await setDoc(doc(db, collectionName, recipe.id), recipe);
    } catch(err) {
        console.log(err)
    }
}

export const getAllDoughRecipes = async () => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q)

    const res = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));
    return  res;
}

export const getDoughRecipe = async (id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw Error('No dough recipes with id ' + id);
    }
}

export const removeDoughRecipe = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
};
