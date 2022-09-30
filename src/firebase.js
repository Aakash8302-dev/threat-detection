import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
  
const firebaseConfig = {
  #YOUR_CONFIG_KEYS
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export default db;
