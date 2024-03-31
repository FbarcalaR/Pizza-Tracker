import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, query } from "firebase/firestore"; 
import { db } from '@/api/setup/firebase'

const recipesCollectionName = 'recipes';

export const setRecipe = async (recipe) => {    
    try {
        await setDoc(doc(db, recipesCollectionName, recipe.id), recipe);
    } catch(err) {
        console.log(err)
    }
}

export const getAllRecipes = async () => {
    const collectionRef = collection(db, recipesCollectionName);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q)

    const res = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));
    return  res;
}

export const getRecipe = async (id) => {
    const docRef = doc(db, recipesCollectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw Error('No recipes with id ' + id);
    }
}

export const removeRecipe = async (id) => {
    await deleteDoc(doc(db, recipesCollectionName, id));
};
