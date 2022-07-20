import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


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
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export { auth, db, storage, usersCollection, songsCollection };
