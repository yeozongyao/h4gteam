import { onSnapshot, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import db from "./firebase";

// ADDING A NEW DOCUMENT - addDoc
export const handleNew = async () => {
    //firestore will generate the id for u
    const name = prompt("Enter color name");
    const value = prompt("Enter color code");
    const collectionRef = collection(db, "colors"); // 1.db 2.name of collection
    const payload = { name, value };
    const docRef = await addDoc(collectionRef, payload);
    console.log("The new ID is: " + docRef.id); // do not need to check for id on firebase 
};

// EDITING A DOCUMENT - setDoc
export const handleEdit = async (id) => {
    // console.log(id); 
    const name = prompt("Enter color name");
    const value = prompt("Enter color value");
    const docRef = doc(db, "colors", id); // 1.db 2.collection 3.document id
    const payload = { name, value };
    setDoc(docRef, payload);
};

// DELETING A DOCUMENT - deleteDoc
export const handleDelete = async (id) => {
    const docRef = doc(db, "colors", id);
    await deleteDoc(docRef);
};

// DELETING WITH QUERY - getDocs
export const handleQueryDelete = async (id) => {
    const userInputName = prompt("Enter color name");
    const collectionRef = collection(db, "colors"); // 1.db 2.name of collection
    const q = query(collectionRef, where("name", "==", userInputName)); // query criteria
    
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
    results.forEach(async result => {
        const docRef = doc(result.id);
        await deleteDoc(docRef);
    })
    
    console.log(snapshot);

};