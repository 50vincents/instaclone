import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCB_yz9WoBsyU5cRhA8lkpTGx_1lcgWx9Y",
  authDomain: "instagram-clone-7564b.firebaseapp.com",
  databaseURL: "https://instagram-clone-7564b.firebaseio.com",
  projectId: "instagram-clone-7564b",
  storageBucket: "instagram-clone-7564b.appspot.com",
  messagingSenderId: "132109735609",
  appId: "1:132109735609:web:b3204607ef22d83affed68",
  measurementId: "G-MSREM7S31L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Firebase services
const db = firebaseApp.firestore(); // db access
const auth = firebase.auth(); // auth login/logout w users
const storage = firebase.storage(); // images storage

export {db, auth, storage};