import { onSnapshot, collection, addDoc, doc, setDoc, query, where, getDocs, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import db from "./firebase";

const EventCollectionRef = collection(db, "EventsTest");

class EventDataService {
    addEvents = (newEvent) => {
        return addDoc(EventCollectionRef, newEvent);
    }

    updateEvent = (id, updatedEvent) => {
        const eventDoc = doc(db, "EventsTest", id);
        return updateDoc(eventDoc, updatedEvent);
    }

    deleteEvent = (id) => {
        const eventDoc = doc(db, "EventsTest", id); 
        return deleteDoc(eventDoc);
    }

    getAllEvent = () => {
        return getDocs(EventCollectionRef);
    }

    getEvent = (id) => {
        const eventDoc = doc(db, "EventsTest", id);
        return getDocs(eventDoc);
    }

}

export default new EventDataService();