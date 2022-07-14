import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2eLbboLkq6OndqItVU431vwoWP70kq4E",
    authDomain: "music-013.firebaseapp.com",
    projectId: "music-013",
    storageBucket: "music-013.appspot.com",
    messagingSenderId: "528873026443",
    appId: "1:528873026443:web:8d2f734797773d1443b58e"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const usersCollection = db.collection('users');

export { auth, db, usersCollection };
