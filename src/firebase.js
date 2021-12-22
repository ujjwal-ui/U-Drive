import { initializeApp } from "firebase/app";
import {getStorage, uploadBytes, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {signOut, getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {query, onSnapshot , where, getFirestore, getDoc, doc, collection, addDoc, Timestamp} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgEhO6wtWuhh-W4dfyEAXiP-tTNxrJDDw",
    authDomain: "u-drive-870fc.firebaseapp.com",
    projectId: "u-drive-870fc",
    storageBucket: "u-drive-870fc.appspot.com",
    messagingSenderId: "85193397235",
    appId: "1:85193397235:web:2eabc289072c26cb60f886"
};

initializeApp(firebaseConfig);
const db = getFirestore();

const convertDoc = doc => {
    return {id: doc.id, ...doc.data()};
}

export {
    Timestamp,    
    query, where,
    db, convertDoc,signOut,
    getAuth, onAuthStateChanged,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    addDoc, getDoc, doc, collection,
    onSnapshot, getStorage, uploadBytes,
    ref, uploadBytesResumable, getDownloadURL
};



  