import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDubSwFDGv_7rvubaa_wab-otmQH0rZLc0",
    authDomain: "instagram-clone-binh.firebaseapp.com",
    projectId: "instagram-clone-binh",
    storageBucket: "instagram-clone-binh.appspot.com",
    messagingSenderId: "559553708181",
    appId: "1:559553708181:web:74469e08de21b6c3909b9c",
    measurementId: "G-P4B1B77X0T"
  };

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default { db, auth, storage };