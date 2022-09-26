import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
  
const firebaseConfig = {
    apiKey: "AIzaSyAkANs98sDIhl2PV3RNCTzrFvXWEnhYcCc",
    authDomain: "threatdetecion.firebaseapp.com",
    databaseURL: "https://threatdetecion-default-rtdb.firebaseio.com",
    projectId: "threatdetecion",
    storageBucket: "threatdetecion.appspot.com",
    messagingSenderId: "399294282193",
    appId: "1:399294282193:web:2fbc2961f9a844a465c8f0",
    measurementId: "G-M7GEKF2KSC"
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export default db;